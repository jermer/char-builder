
<script>
const { PDFDocument } = PDFLib;

import {
    frontPageDocIds,
    interiorDocId,
    spellBookDocIds
} from "../models/gDocIds";

const API_KEY = import.meta.env.VITE_API_KEY;

const pdfUrl = (docId) => {
    return `https://www.googleapis.com/drive/v3/files/${docId}`
        + `?alt=media`
        + `&key=${API_KEY}`
};

import { getCharacter } from '../models/character';
import { options } from '../models/options';

export default {
    emits: ['update-error-flag'],
    setup() {
        const { character, characterClassError, abilitiesError, skillsError, equipmentError, identityError } = getCharacter();
        return { character, characterClassError, abilitiesError, skillsError, equipmentError, identityError };
    },
    data() {
        return {
            //character: {},
            options,
            processing: false,
            //
            // SAMPLE CHARACTER FOR TESTING
            //
            sampleCharacter: {
                characterClass: 'cleric',
                abilityScores: [10, 14, 12, 8, 17, 18],
                abilityModifiers: [0, 2, 1, -1, 3, 4],
                skills: ['stealth', 'natureSurvival', 'intimidation', 'recollection'],
                armor: 'light armor',
                weapon1: 'longsword',
                weapon2: 'slingshot',
                gear: ['blanket', 'crowbar', 'lantern & oil', 'rope (50 feet long)', 'whistle'],
                name: 'Ordgarius the Temporary',
                pronouns: 'he/him',
                description: 'A test subject to see if we can get the PDF stuff working correctly!',
            }
            // END TEST CHARACTER
        }
    },
    computed: {
        isReady() {
            return (
                !this.characterClassError
                && !this.abilitiesError
                && !this.skillsError
                && !this.equipmentError
                && !this.identityError
            )
        },
        isDisabled() {
            // for now, the button is always active
            // the property 'isReady' governs whether the PDF
            // is generated
            return false;
        }
    },
    methods: {
        async getCharSheet() {
            if (!this.isReady) {
                this.$emit('update-error-flag');
                return;
            }

            this.processing = true;

            //
            // the first page of the booklet varies by class
            //
            const frontPageUrl = pdfUrl(frontPageDocIds[this.character.characterClass]);

            // get the document as a byte array
            const frontPagePdfBytes = await fetch(frontPageUrl).then(res => res.arrayBuffer());

            // convert to PDF document
            const frontPagePdfDoc = await PDFDocument.load(frontPagePdfBytes);
            // get the form and fill it in
            const frontPageForm = frontPagePdfDoc.getForm();
            this.fillFrontPage(frontPageForm);
            frontPagePdfDoc.save();

            //
            // the interior page is the same for all booklets
            //
            const interiorPageUrl = pdfUrl(interiorDocId);

            const interiorPdfBytes = await fetch(interiorPageUrl).then(res => res.arrayBuffer());
            const interiorPdfDoc = await PDFDocument.load(interiorPdfBytes);
            const interiorForm = interiorPdfDoc.getForm();
            this.fillCharSheet(interiorForm);
            interiorPdfDoc.save();

            //
            // spellbook pages are added to the booklet, if a spellcasting class was chosen
            //
            let spellPagePdfDoc = null;
            if (this.character.characterClass === 'cleric'
                || this.character.characterClass === 'druid'
                || this.character.characterClass === 'wizard'
            ) {
                const spellPageUrl = pdfUrl(spellBookDocIds[this.character.characterClass]);

                const spellPagePdfBytes = await fetch(spellPageUrl).then(res => res.arrayBuffer());
                spellPagePdfDoc = await PDFDocument.load(spellPagePdfBytes);

                // get the form and fill it in
                const spellPageForm = spellPagePdfDoc.getForm();
                this.fillSpellPage(spellPageForm);
                spellPagePdfDoc.save();
            }

            //
            // Assemble the PDF
            // Add interior page to front page
            //
            const [page2] = await frontPagePdfDoc.copyPages(interiorPdfDoc, [0]);
            frontPagePdfDoc.addPage(page2);

            //
            // Add spellbook pages, if any
            //
            if (spellPagePdfDoc) {
                const [page3, page4] = await frontPagePdfDoc.copyPages(spellPagePdfDoc, [0, 1]);
                frontPagePdfDoc.addPage(page3);
                frontPagePdfDoc.addPage(page4);
            }

            const finalPdfBytes = await frontPagePdfDoc.save()

            // open document in a new tab instead of automatically downloading?
            // download(finalPdfBytes, "HeroBooklet.pdf", "application/pdf");
            download(finalPdfBytes, `${this.character.name} Hero Booklet.pdf`, "application/pdf");

            this.processing = false;
        },
        //
        // Utility method to format modifiers: non-negative values should have prefix plus sign '+'
        //
        formatModifier(modNum) {
            return modNum < 0 ? modNum.toString() : `+${modNum}`;
        },
        //
        //
        //
        fillFrontPage(form) {
            let nameText = this.character.name;
            let pronounText = this.character.pronouns;

            // check pronoun text and append parentheses, if not already present
            if (pronounText) {
                if (!pronounText.startsWith('(')) pronounText = `(${pronounText}`;
                if (!pronounText.endsWith(')')) pronounText = `${pronounText})`;
            }

            form.getTextField('heroName').setText(nameText);
            form.getTextField('heroPronouns').setText(pronounText);
            form.getTextField('heroDescription').setText(this.character.description);
            form.getTextField('heroLevel').setText('1');
        },
        //
        //
        //
        fillCharSheet(form) {
            // Fill in ability modifiers and saving throws
            this.options.abilityLabels.forEach((el) => {
                // form.getTextField(`${el}Score`).setText(this.character.abilityScores[i].toString());

                form.getTextField(`${el}Mod`).setText(
                    this.formatModifier(
                        this.character.abilityModifiers[el]
                    ));

                form.getTextField(`${el}SaveMod`).setText(
                    this.formatModifier(
                        this.character.abilityModifiers[el]
                    ));

            })

            // fill in base saving throw modifiers = same as base ability modifiers
            // this.options.abilityLabels.forEach(el => {
            //     form.getTextField(`${el}SaveMod`).setText(
            //         this.formatModifier(
            //             this.character.abilityModifiers[el]
            //         ));
            // })

            // update saving throws proficiencies (based on character class)
            let classObj = this.options.classList.find(el => el.name === this.character.characterClass);
            classObj.savingThrows.forEach(el => {
                // check the boxes for proficient saving throws
                form.getCheckBox(`${el}SaveCheck`).check();
                // update the modifier
                const field = form.getTextField(`${el}SaveMod`);
                field.setText(this.formatModifier(+field.getText() + 2));
            });

            // fill in base skill modifiers = same as base ability modifiers
            this.options.skillList.forEach(el => {
                form.getTextField(`${el.fieldName}Mod`).setText(
                    this.formatModifier(this.character.abilityModifiers[el.ability])
                );
            })

            // update skill proficiencies (based on user selections)
            this.character.skills.forEach(el => {
                // check the boxes for the selected skills
                form.getCheckBox(`${el}Check`).check();
                // update the modifiers
                let field = form.getTextField(`${el}Mod`);
                field.setText(this.formatModifier(+field.getText() + 2));
            });

            // list the armor
            form.getTextField('armorType').setText(this.character.armor);

            // calculate Armor Class = DEX Modifier + (12, 14, 16) for (light, medium, heavy) armor
            // TO DO: refactor this to armor object
            let baseAc = 12;
            if (this.character.armor === "medium armor") baseAc += 2;
            if (this.character.armor === "heavy armor") baseAc += 4;
            let ac = baseAc + this.character.abilityModifiers['dex'];
            form.getTextField('armorClass').setText(ac.toString());

            // set HP maximum = 10 + CON Modifier
            let hp = 10 + Math.max(0, this.character.abilityModifiers['con']);
            form.getTextField('hpMax').setText(hp.toString());

            // list the weapons
            let weapon1Obj = options.weaponList.find(el => el.name === this.character.weapon1);
            let weapon2Obj = options.weaponList.find(el => el.name === this.character.weapon2);

            // melee weapon, uses STR modifier
            let w1Mod = this.character.abilityModifiers['str'];
            form.getTextField('weapon1').setText(weapon1Obj.name);
            form.getTextField('weapon1AttackMod').setText(this.formatModifier(w1Mod + 2));
            let w1DmgMod = w1Mod > 0 ? this.formatModifier(w1Mod) : '';
            form.getTextField('weapon1Damage').setText(`${weapon1Obj.damageDice}${w1DmgMod}`);

            // ranged weapon, uses DEX modifier
            let w2Mod = this.character.abilityModifiers['dex'];
            form.getTextField('weapon2').setText(weapon2Obj.name);
            form.getTextField('weapon2AttackMod').setText(this.formatModifier(w2Mod + 2));
            let w2DmgMod = w2Mod > 0 ? this.formatModifier(w2Mod) : '';
            form.getTextField('weapon2Damage').setText(`${weapon2Obj.damageDice}${w2DmgMod}`);

            // list adventuring gear
            form.getTextField('equipmentList').setText(this.character.gear.join('\n'));
        },
        fillSpellPage(form) {
            // clerics and druids use WIS modifier
            let spellAbility = 'wis';
            // wizards use INT modifier
            if (this.character.characterClass === 'wizard')
                spellAbility = 'int';

            let spellMod = this.character.abilityModifiers[spellAbility];

            form.getTextField('spellAttackMod').setText(this.formatModifier(spellMod + 2));

            let saveDiff = +spellMod + 10;
            form.getTextField('spellSaveDifficulty').setText(saveDiff.toString());
        }
    }
}
</script>

<template>
    <button id="pdf-btn" :class="`btn btn-dark mt-3 ${isDisabled ? '' : 'ready'}`" @click="getCharSheet">
        {{ processing ?
            'Processing...'
            : 'Download Hero Booklet' }}
    </button>
</template>

<style>
#pdf-btn.ready {
    color: white;
    background-color: #0d6efd;
    border-color: #0d6efd;
}

#pdf-btn:not(.ready) {
    color: white;
    background-color: lightgray;
    border-color: lightgray;
}
</style>