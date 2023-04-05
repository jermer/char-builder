/**
 * Reactive object containing all of the fields
 * needed for rendering the PDF character sheet.
 */

import { reactive, ref, computed } from 'vue'

export const character = reactive({
    // character creation choices and options
    abilityLabels: ['str', 'dex', 'con', 'int', 'wis', 'cha'],

    // character selections
    charClass: '',
    abilityScores: [0, 0, 0, 0, 0, 0],
    abilityModifiers: [0, 0, 0, 0, 0, 0],
    skills: [],

    // error indicators
    showErrors: false,
    classError: computed(() => {
        return character.charClass === '';
    }),
    abilityError: computed(() => {
        return false;

        const abilityTotal = character.abilityScores.reduce((acc, cur) => acc + cur, 0)
        return abilityTotal !== 75;
    }),
    skillError: computed(() => {
        return character.skills.length < 4;
    }),
    gearError: computed(() => {
        return false;
    }),
    identityError: computed(() => {
        return false;
    }),

    // updater methods
    updateCharClass(data) {
        this.charClass = data
    },
    updateAbilityScores(newScores, newMods) {
        this.abilityScores = [...newScores];
        this.abilityModifiers = [...newMods];
    },
    updateSkills(newSkills) {
        this.skills = [...newSkills];
    },
    setErrorFlag(val) {
        this.showErrors = val;
    }
})