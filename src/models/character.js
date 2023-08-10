/**
 * Reactive object containing all of the fields
 * needed for rendering the PDF character sheet.
 */

import { reactive, ref, computed, watch } from 'vue'
import { options } from './options';

const character = reactive({
    A: [1, 1, 1],
    B: 2,
    characterClass: '',
    abilityScores: [],
    abilityModifiers: {
        'str': 4,
        'dex': 3,
        'con': 2,
        'int': 1,
        'wis': 0,
        'cha': -1,
    },
    abilityRanking: ['str', 'dex', 'con', 'int', 'wis', 'cha'],
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
        // character.abilityScores.map((score, idx) => {
        //     character.abilityModifiers[idx] = Math.floor(score / 2) - 5;
        // })
        // modifiers run through: 4, 3, 2, 1, 0, -1
        let modifier = 4;
        character.abilityRanking.forEach(ability => {
            character.abilityModifiers[ability] = modifier;
            modifier--;
        })

    };

    const updateCharacter = (newData) => {
        for (const [k, v] of Object.entries(newData)) {
            character[k] = Array.isArray(v) ? [...v] : v;
            // when character class changes, update ability ranking
            if (k === 'characterClass' && v)
                character.abilityRanking = options.abilityPresets[v];
            // when ability scores change, update ability modifiers
            if (k === 'abilityRanking')
                calculateAbilityModifiers();
        }
    }

    const characterClassError = computed(() => {
        if (!character.characterClass) return "Please select a character class."
        return "";
    })

    const abilitiesError = computed(() => {
        return false;
        // Updated
        // const abilityTotal = character.abilityScores.reduce((acc, cur) => acc + cur, 0)
        // if (abilityTotal !== 75) return "Please drag all of the tiles to an ability score.";
        // return "";
    })

    const skillsError = computed(() => {
        if (character.skills.length < 4) return "Please select four skills."
        return "";
    })

    const armorError = computed(() => {
        if (!character.armor)
            return "Please select an armor choice."
        if (
            (character.characterClass === 'rogue' || character.characterClass === 'wizard')
            && character.armor !== 'light armor'
        )
            return "Rouges and Wizards must choose light armor.";
        if (character.armor === 'heavy armor' &&
            !(character.characterClass === 'cleric' || character.characterClass === 'warrior'))
            return "Only Clerics and Warriors may wear heavy armor.";

        return "";
    })

    const weapon1Error = computed(() => {
        const weapon1Obj = options.weaponList.find(el => el.name === character.weapon1);

        if (!weapon1Obj)
            return "Please select a weapon choice."
        if (
            !weapon1Obj.isSimple &&
            !(character.characterClass === 'cleric' || character.characterClass === 'warrior')
        )
            return "Only Clerics and Warriors may use advanced hand-to-hand weapons."

        return "";
    })

    const weapon2Error = computed(() => {
        const weapon2Obj = options.weaponList.find(el => el.name === character.weapon2);

        if (!weapon2Obj)
            return "Please select a weapon choice."
        if (
            !weapon2Obj.isSimple &&
            !(character.characterClass === 'druid' || character.characterClass === 'ranger')
        )
            return "Only Druids and Rangers may use advanced ranged weapons."

        return "";
    })

    const gearError = computed(() => {
        // gear it not required
        return false;
        // if (character.gear.length < 5) return "Please select five pieces of gear."
        // return "";
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
        if (!character.name)
            return "Please give this hero a name."

        return "";
    })

    return {
        character,
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