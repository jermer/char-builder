
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
            if (this.character.charClass === '')
                return true;

            const abilityTotal = this.character.abilityScores.reduce((acc, cur) => acc + cur, 0)
            if (abilityTotal !== 75)
                return true;

            return false;
        }
    },
    methods: {
        async getCharSheet() {
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
    <button class="btn btn-dark mt-3" @click="getCharSheet" :disabled="isDisabled">
        Download Character Sheet
    </button>
</template>