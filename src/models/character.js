/**
 * Reactive object containing all of the fields
 * needed for rendering the PDF character sheet.
 */

import { reactive, ref, computed } from 'vue'

export const character = reactive({
    // character creation choices and options
    // abilityLabels: ['str', 'dex', 'con', 'int', 'wis', 'cha'],

    // character selections
    charClass: '',
    abilityScores: [0, 0, 0, 0, 0, 0],
    abilityModifiers: [0, 0, 0, 0, 0, 0],
    skills: [],
    armor: '',
    meleeWeapon: '',
    rangeWeapn: '',
    gear: [],
    name: '',
    pronouns: '',
    description: '',

    // error indicators
    showErrors: false,
    classError: computed(() => {
        return character.charClass === '';
    }),
    abilityError: computed(() => {
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
        // return Object.values(character.identity).some(val => val === '');
        return character.name === ''
            || character.pronouns === ''
            || character.description === '';
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
    updateGear(newGear) {
        this.gear = [...newGear];
    },
    updateName(newData) {
        this.name = newData;
    },
    updatePronouns(newData) {
        this.pronouns = newData;
    },
    updateDescription(newData) {
        this.description = newData;
    },
    setErrorFlag(val) {
        this.showErrors = val;
    }
})