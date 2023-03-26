
import { reactive } from 'vue'

export const character = reactive({
    charClass: '',
    abilityScores: [0, 0, 0, 0, 0, 0],
    abilityModifiers: [0, 0, 0, 0, 0, 0],
    updateCharClass(data) {
        this.charClass = data
    },
    updateAbilityScores(newScores, newMods) {
        this.abilityScores = [...newScores];
        this.abilityModifiers = [...newMods];
    }
})