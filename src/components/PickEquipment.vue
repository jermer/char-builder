
<script>
import { getCharacter } from '../models/character';
import { options } from '../models/options';

export default {
    props: ['showErrors'],
    setup() {
        const { character,
            armorError, weapon1Error, weapon2Error, gearError,
            updateCharacter } = getCharacter();
        return {
            character,
            armorError, weapon1Error, weapon2Error, gearError,
            updateCharacter
        };
    },
    data() {
        return {
            armorPicked: '',
            meleeWeaponPicked: '',
            rangeWeaponPicked: '',
            gearPicked: [],
            options,
        }
    },
    methods: {
        handleChange(evt) {
            this.updateCharacter({
                armor: this.armorPicked,
                weapon1: this.meleeWeaponPicked,
                weapon2: this.rangeWeaponPicked,
                gear: this.gearPicked
            });

            // enforce the limit on number of checkboxes
            if (this.gearPicked.length >= 5) {
                // disable all unselected checkboxes
                document.querySelectorAll("input[name=gear-select]:not(:checked)").forEach(el => el.setAttribute('disabled', ''))
            } else {
                // enable all checkboxes
                document.querySelectorAll("input[name=gear-select]").forEach(el => el.removeAttribute('disabled', ''))
            }
        },
        filterArmor(armor) {
            if (armor === 'light armor') return false;

            if (armor === 'heavy armor' && this.character.characterClass !== 'cleric' && this.character.characterClass !== 'warrior') return true;

            if (armor === 'medium armor' && this.character.characterClass === '' || this.character.characterClass === 'rogue' || this.character.characterClass === 'wizard') return true;

            return false;
        },
        filterWeapons(weapon) {
            if (weapon.isSimple) return false;

            if (weapon.attackAbility === 'str' && this.character.characterClass !== 'cleric' && this.character.characterClass !== 'warrior') return true;

            if (weapon.attackAbility === 'dex' && this.character.characterClass !== 'druid' && this.character.characterClass !== 'ranger') return true;

            return false;
        },
    }
}
</script>

<template>
    <div>
        <h5>Armor</h5>

        <!-- Instructions -->
        Choose the type of armor that your hero wears.

        <!-- Error message -->
        <div v-if="showErrors && armorError" class="alert alert-warning">
            {{ armorError }}
        </div>

        <!-- Debugging -->
        <!-- <div class="alert alert-secondary">You have selected: {{ char.armor }}</div> -->

        <div v-for="(armor, idx) in options.armorList" class="form-check">
            <input type="radio" name="armor-select" :id="`class-${armor.name}`" :value="`${armor.name}`"
                class="form-check-input" v-model="armorPicked" @change="handleChange" :disabled="filterArmor(armor.name)" />
            <label :for="`class-${armor.name}`" class="form-check-label">{{ armor.name + ": " + armor.tooltip }}</label>
        </div>
    </div>

    <hr />
    <div>
        <h5>Hand-to-hand Weapon</h5>

        <!-- Instructions -->
        Choose a <i>hand-to-hand weapon</i>.
        Simple hand-to-hand weapons can be used by anyone. Advanced hand-to-hand
        weapons are more
        powerful, but can only be used by Clerics and Warriors.

        <!-- Error message -->
        <div v-if="showErrors && weapon1Error" class="alert alert-warning">
            {{ weapon1Error }}
        </div>

        <!-- Debugging -->
        <!-- <div class="alert alert-secondary">You have selected: {{ char.weapon1 }} </div> -->

        <!-- Render dropdown list -->
        <select name="melee-select" class="form-select" v-model="meleeWeaponPicked" @change="handleChange">
            <optgroup label="simple weapons">
                <template v-for="w in options.weaponList">
                    <option v-if="w.isSimple && w.attackAbility === 'str'" :value="w.name">
                        {{ w.name }}
                    </option>
                </template>
            </optgroup>
            <optgroup label="advanced weapons">
                <template v-for="w in options.weaponList">
                    <option v-if="!w.isSimple && w.attackAbility === 'str'" :disabled="filterWeapons(w)">{{ w.name }}
                    </option>
                </template>
            </optgroup>
        </select>
    </div>

    <hr />
    <div>
        <h5>Ranged Weapon</h5>

        <!-- Instructions -->
        Choose a <i>ranged weapon</i>.
        Simple ranged weapons can be used by anyone. Advanced ranged weapons are more powerful, but can only
        be used by Druids and Rangers.

        <!-- Error message -->
        <div v-if="showErrors && weapon2Error" class="alert alert-warning">
            {{ weapon2Error }}
        </div>

        <!-- Debugging -->
        <!-- <div class="alert alert-secondary">You have selected: {{ char.weapon2 }} </div> -->

        <!-- Render dropdown list -->
        <select name="range-select" class="form-select" v-model="rangeWeaponPicked" @change="handleChange">
            <optgroup label="simple weapons">
                <template v-for="w in options.weaponList">
                    <option v-if="w.isSimple && w.attackAbility === 'dex'" :value="w.name">
                        {{ w.name }}
                    </option>
                </template>
            </optgroup>
            <optgroup label="advanced weapons">
                <template v-for="w in options.weaponList">
                    <option v-if="!w.isSimple && w.attackAbility === 'dex'" :disabled="filterWeapons(w)">{{ w.name }}
                    </option>
                </template>
            </optgroup>
        </select>
    </div>

    <hr />
    <div>
        <h5>Adventuring Gear</h5>
        Your hero has a <i>backpack</i> plus <i>up to 5 items</i> from the list of adventuring gear below.

        <!-- Error message -->
        <div v-if="showErrors && gearError" class="alert alert-warning">
            {{ gearError }}
        </div>

        <!-- Debugging -->
        <!-- <div class="alert alert-secondary">You have selected: {{ char.gear }} </div> -->

        <div v-for="(itm, idx) in options.gearList" class="form-check">
            <input type="checkbox" name="gear-select" :id="`gear-${itm.name}`" :value="`${itm.name}`"
                class="form-check-input" v-model="gearPicked" @change="handleChange" />
            <label :for="`gear-${itm.name}`" class="form-check-label">{{ itm.name }}</label>
        </div>
    </div>
</template>
