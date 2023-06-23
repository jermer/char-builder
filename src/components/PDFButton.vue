
<script>
const { PDFDocument } = PDFLib;
import { character } from '../models/character.js';
import { options } from '../models/options';

export default {
    data() {
        return {
            character,
            options,
            // SAMPLE CHARACTER FOR TESTING
            sampleCharacter: {
                charClass: 'warrior',
                abilityScores: [10, 14, 12, 8, 17, 18],
                abilityModifiers: [0, 2, 1, -1, 3, 4],
                skills: ['stealth', 'natureSurvival', 'intimidation', 'recollection'],
                armor: 'light armor',
                meleeWeapon: 'longsword',
                rangeWeapon: 'slingshot',
                gear: ['blanket', 'crowbar', 'lantern & oil', 'rope (50 feet long)', 'whistle'],
                name: 'Ordgarius the Temporary',
                pronouns: 'he/him',
                description: 'A test subject to see if we can get the PDF stuff working correctly!',
            }
        }
    },
    computed: {
        isDisabled() {
            return false;
            // for testing
            return (
                this.character.classError
                || this.character.abilityError
                || this.character.skillError
                || this.character.gearError
                || this.character.identityError
            )
        }
    },
    methods: {
        async getCharSheet() {
            if (this.isDisabled) {
                character.setErrorFlag(true);
                return;
            }

            //
            // the first page of the booklet varies by class
            //
            const frontPageUrl = '/heroBookletFrontCleric.pdf';
            const frontPagePdfBytes = await fetch(frontPageUrl).then(res => res.arrayBuffer());

            const frontPagePdfDoc = await PDFDocument.load(frontPagePdfBytes);

            //
            // the interior page is the same for all booklets
            //
            const interiorPageUrl = '/heroBookletInterior.pdf';
            // get the document as byte array
            const interiorPdfBytes = await fetch(interiorPageUrl).then(res => res.arrayBuffer());
            // convert to PDF document
            const interiorPdfDoc = await PDFDocument.load(interiorPdfBytes);
            // get the form and fill it in
            const interiorForm = interiorPdfDoc.getForm();
            this.fillCharSheet(interiorForm);
            interiorPdfDoc.save();

            //
            // spellbook pages can be added to the booklet
            //
            let spellPagePdfDoc = null;
            if (false) {
                const spellPageUrl = '/heroBookletSpellsCleric.pdf';
                const spellPagePdfBytes = await fetch(spellPageUrl).then(res => res.arrayBuffer());
                spellPagePdfDoc = await PDFDocument.load(spellPagePdfBytes);
            }

            // const pdfDoc = await PDFDocument.load(interiorPdfBytes);

            // save the updated PDF
            // const finalPdfBytes = await interiorPdfDoc.save()

            // Add interior page to front page
            const [page2] = await frontPagePdfDoc.copyPages(interiorPdfDoc, [0]);
            frontPagePdfDoc.addPage(page2);

            // Add spellbook pages, if any
            if (spellPagePdfDoc) {
                const [page3, page4] = await frontPagePdfDoc.copyPages(spellPagePdfDoc, [0, 1]);
                frontPagePdfDoc.addPage(page3);
                frontPagePdfDoc.addPage(page4);
            }

            const finalPdfBytes = await frontPagePdfDoc.save()

            // TO DO: have the document open in a new tab instead of automatically downloading
            download(finalPdfBytes, "HeroBooklet.pdf", "application/pdf");
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
        fillFrontPage() {

        },
        //
        //
        //
        fillCharSheet(form) {
            // use the temporary character
            this.character = this.sampleCharacter;

            console.log("Generating Character Sheet!")

            // ABILITY SCORES
            for (let i = 0; i < 6; i++) {
                // fill in ability scores
                form.getTextField(`${options.abilityLabels[i]}Score`).setText(this.character.abilityScores[i].toString());
                // let modNum = this.character.abilityModifiers[i];
                // let modStr = modNum < 0 ? modNum.toString() : `+${modNum}`;
                // form.getTextField(`${options.abilityLabels[i]}Mod`).setText(modStr);
                form.getTextField(`${options.abilityLabels[i]}Mod`).setText(this.formatModifier(this.character.abilityModifiers[i]));
            }

            // fill in the saving throw modifiers = same as base ability modifier
            this.options.abilityLabels.forEach(el => {
                // let modNum = this.character.abilityModifiers[options.abilityLabels.indexOf(el)];
                // let modStr = modNum < 0 ? modNum.toString() : `+${modNum}`;
                // form.getTextField(`${el}SaveMod`).setText(modStr);
                form.getTextField(`${el}SaveMod`).setText(
                    this.formatModifier(
                        this.character.abilityModifiers[options.abilityLabels.indexOf(el)]
                    ));
            })

            // update proficient saving throws
            let classObj = this.options.classList.find(el => el.name === this.character.charClass);
            classObj.savingThrows.forEach(el => {
                // check the box
                form.getCheckBox(`${el}SaveCheck`).check();
                // update the modifier
                let field = form.getTextField(`${el}SaveMod`);
                // let modNum = +field.getText() || 0;
                // modNum += 2;
                // let modStr = modNum < 0 ? modNum.toString() : `+${modNum}`;
                // field.setText(modStr.toString());
                field.setText(this.formatModifier(+field.getText() + 2));
            });

            // fill in the skill modifiers = same as base ability modifier
            this.options.skillList.forEach(el => {
                // let modNum = this.character.abilityModifiers[options.abilityLabels.indexOf(el.ability)];
                // let modStr = modNum < 0 ? modNum.toString() : `+${modNum}`;
                // form.getTextField(`${el.fieldName}Mod`).setText(modStr);
                form.getTextField(`${el.fieldName}Mod`).setText(
                    this.formatModifier(this.character.abilityModifiers[options.abilityLabels.indexOf(el.ability)])
                );
            })

            // update the proficient skills
            this.character.skills.forEach(el => {
                // check the boxes for the selected skills
                form.getCheckBox(`${el}Check`).check();
                // update the modifiers
                let field = form.getTextField(`${el}Mod`);
                // let modNum = +field.getText() || 0;
                // modNum += 2;
                // let modStr = modNum < 0 ? modNum.toString() : `+${modNum}`;
                // field.setText(modStr.toString());
                field.setText(this.formatModifier(+field.getText() + 2));
            });

            // list the armor
            form.getTextField('armorType').setText(this.character.armor);

            // calculate Armor Class = DEX Modifier + (12, 14, 16) for (light, medium, heavy) armor
            // THIS COULD BE BETTER
            let baseAc = 12;
            if (this.character.armor === "medium armor") baseAc += 2;
            if (this.character.armor === "heavy armor") baseAc += 4;
            let ac = baseAc + this.character.abilityModifiers[1];
            form.getTextField('armorClass').setText(ac.toString());

            // set HP maximum = 10 + CON Modifier
            let hp = 10 + Math.max(0, this.character.abilityModifiers[2]);
            form.getTextField('hpMax').setText(hp.toString());

            // list the weapons
            let weapon1Obj = options.weaponList.find(el => el.name === this.character.meleeWeapon);
            let weapon2Obj = options.weaponList.find(el => el.name === this.character.rangeWeapon);

            // melee weapon
            let w1DamageMod = this.character.abilityModifiers[0];
            // let w1AttackMod = w1DamageMod + 2;
            form.getTextField('weapon1').setText(weapon1Obj.name);
            form.getTextField('weapon1AttackMod').setText(this.formatModifier(w1DamageMod + 2));
            form.getTextField('weapon1Damage').setText(`${weapon1Obj.damageDice}+${w1DamageMod}`);

            // ranged weapon
            let w2DamageMod = this.character.abilityModifiers[1];
            // let w2AttackMod = w2DamageMod + 2;
            form.getTextField('weapon2').setText(weapon2Obj.name);
            form.getTextField('weapon2AttackMod').setText(this.formatModifier(w2DamageMod + 2));
            form.getTextField('weapon2Damage').setText(`${weapon2Obj.damageDice}+${w2DamageMod}`);

            // list adventuring gear
            form.getTextField('equipmentList').setText(this.character.gear.join('\n'));
        }
    }
}
</script>

<template>
    <button id="pdf-btn" :class="`btn btn-dark mt-3 ${isDisabled ? '' : 'ready'}`" @click="getCharSheet">
        Download Hero Booklet
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