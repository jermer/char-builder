
<script>
const { PDFDocument } = PDFLib;
import { character } from './character.js';

export default {
    data() {
        return {
            character
        }
    },
    computed: {
        isDisabled() {
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

            console.log("getCharSheet!", this.character.charClass, this.character.abilityScores, this.character.abilityModifiers)

            const formUrl = '/charBookletInterior.pdf'
            const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

            const pdfDoc = await PDFDocument.load(formPdfBytes);

            const form = pdfDoc.getForm()

            // show the character class...
            form.getTextField('armorType').setText(this.character.charClass);

            const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
            for (let i = 0; i < 6; i++) {
                form.getTextField(`${abilities[i]}Score`).setText(this.character.abilityScores[i].toString());
                form.getTextField(`${abilities[i]}Mod`).setText(this.character.abilityModifiers[i].toString());
            }

            const pdfBytes = await pdfDoc.save()

            download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
        }
    }
}
</script>

<template>
    <button id="pdf-btn" :class="`btn btn-dark mt-3 ${isDisabled ? '' : 'ready'}`" @click="getCharSheet">
        Download Character Sheet
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