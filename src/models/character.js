/**
 * Reactive object containing all of the fields
 * needed for rendering the PDF character sheet.
 */

import { reactive, ref, computed, watch } from 'vue'

const char = reactive({
    A: [1, 1, 1],
    B: 2,
    characterClass: '',
    abilityScores: [],
    abilityModifiers: [],
    skills: [],
    armor: '',
    weapon1: '',
    weapon2: '',
    gear: [],
    name: '',
    pronouns: '',
    description: ''
})

export const getCharacter = () => {
    const calculateAbilityModifiers = () => {
        char.abilityScores.map((score, idx) => {
            char.abilityModifiers[idx] = Math.floor(score / 2) - 5;
        })
    };

    const updateCharacter = (newData) => {
        for (const [k, v] of Object.entries(newData)) {
            char[k] = Array.isArray(v) ? [...v] : v;
            // wheh ability scores change, update ability modifiers
            if (k === 'abilityScores')
                calculateAbilityModifiers();
        }
    }

    const characterClassError = computed(() => {
        if (!char.characterClass) return "Please select a character class."
        return "";
    })

    const abilitiesError = computed(() => {
        const abilityTotal = char.abilityScores.reduce((acc, cur) => acc + cur, 0)
        if (abilityTotal !== 75) return "Please drag all of the tiles to an ability score.";
        return "";
    })

    const skillsError = computed(() => {
        if (char.skills.length < 4) return "Please select four skills."
        return "";
    })

    const armorError = computed(() => {
        if (!char.armor)
            return "Please select an armor choice."
        if (
            (char.characterClass === 'rogue' || char.characterClass === 'wizard')
            && char.armor !== 'light armor'
        )
            return "Rouges and Wizards must choose light armor.";
        if (char.armor === 'heavy armor' &&
            !(char.characterClass === 'cleric' || char.characterClass === 'warrior'))
            return "Only Clerics and Warriors can wear heavy armor.";

        return "";
    })

    const weapon1Error = computed(() => {
        if (!char.weapon1) return "Please select a weapon choice."
        return "";
    })

    const weapon2Error = computed(() => {
        if (!char.weapon2) return "Please select a weapon choice."
        return "";
    })

    const gearError = computed(() => {
        if (char.gear.length < 5) return "Please select five pieces of gear."
        return "";
    })

    const equipmentError = computed(() => {
        return (
            armorError.value
            || weapon1Error.value
            || weapon2Error.value
            || gearError.value
        );
    })

    const identityError = computed(() => {
        // this section is currently optional
        return false;
    })

    return {
        char,
        characterClassError,
        abilitiesError,
        skillsError,
        armorError,
        weapon1Error,
        weapon2Error,
        gearError,
        equipmentError,
        identityError,
        updateCharacter
    }
}

// export const character = reactive({});
//     // character statistics
//     stats: {
//         charClass: '',

//     },

//     // character selections
//     charClass: '',
//     abilityScores: [0, 0, 0, 0, 0, 0],
//     abilityModifiers: [0, 0, 0, 0, 0, 0],
//     skills: [],
//     armor: '',
//     meleeWeapon: '',
//     rangeWeapn: '',
//     gear: [],
//     name: '',
//     pronouns: '',
//     description: '',

//     // error indicators



//     showErrors: false,
//     classError: computed(() => {
//         return character.stats.charClass === '';
//     }),
//     abilityError: computed(() => {
//         const abilityTotal = character.abilityScores.reduce((acc, cur) => acc + cur, 0)
//         return abilityTotal !== 75;
//     }),
//     skillError: computed(() => {
//         return character.skills.length < 4;
//     }),
//     gearError: computed(() => {
//         return character.armorError;// || character.weaponError || character.gearError;
//     }),
//     armorError: computed(() => {
//         if (character.armor === '')
//             return true;

//         // rogues and wizards must wear light armor
//         if (character.armor !== 'light armor'
//             && (character.charClass === 'rogue' || character.charClass === 'wizard')
//         ) {
//             return true;
//         }

//         // only clerics and warriors can wear heavy armor
//         if (character.armor === 'heavy armor'
//             && !(character.charClass === 'cleric' || character.charClass === 'warrior')
//         ) {
//             return true;
//         }
//         return false;
//     }),
//     weaponError: computed(() => {
//         return false;
//     }),
//     armorError: computed(() => {
//         return false;
//         // return character.gear.length < 5;
//     }),
//     identityError: computed(() => {
//         // return Object.values(character.identity).some(val => val === '');
//         return character.name === ''
//             || character.pronouns === ''
//             || character.description === '';
//     }),

//     // SINGLE UPDATER METHOD
//     update(newData) {
//         this.stats = { ...this.stats, ...newData };
//     },

//     // redundant updater methods -- refactoring
//     updateCharClass(data) {
//         console.log("B");
//         this.charClass = data
//     },
//     updateAbilityScores(newScores, newMods) {
//         this.abilityScores = [...newScores];
//         this.abilityModifiers = [...newMods];
//     },
//     updateSkills(newSkills) {
//         this.skills = [...newSkills];
//     },
//     updateArmor(newArmor) {
//         this.armor = newArmor;
//     },
//     updateGear(newGear) {
//         this.gear = [...newGear];
//     },
//     updateName(newData) {
//         this.name = newData;
//     },
//     updatePronouns(newData) {
//         this.pronouns = newData;
//     },
//     updateDescription(newData) {
//         this.description = newData;
//     },
//     setErrorFlag(val) {
//         this.showErrors = val;
//     }
// })