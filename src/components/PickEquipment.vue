
<script setup>
import LimitedCheckbox from './LimitedCheckbox.vue';
</script>

<script>
import { character } from '../models/character';
import { options } from '../models/options';

export default {
    data() {
        return {
            armorPicked: '',
            meleeWeaponPicked: '',
            rangeWeaponPicked: '',
            gearPicked: [],
            character,
            options,
        }
    },
    methods: {
        handleChange(evt) {
            console.debug("Updating gear...");

            this.character.updateArmor(this.armorPicked);

            // enforce the limit on number of checkboxes
            if (this.gearPicked.length >= 5) {
                // disable all unselected checkboxes
                document.querySelectorAll("input[name=gear-select]:not(:checked)").forEach(el => el.setAttribute('disabled', ''))
            } else {
                // enable all checkboxes
                document.querySelectorAll("input[name=gear-select]").forEach(el => el.removeAttribute('disabled', ''))
            }
        },
        handleUpdate(arr) {
            this.character.updateGear(arr);
        },
        handleClick(evt) {
            // mark as inactive all buttons other than this one
            const activeButtons = document.querySelectorAll(`button.armor-btn.active`);
            activeButtons.forEach(b => {
                if (b.id !== evt.target.id)
                    b.classList.remove('active');
            });
            // update the character in state
            const newClass = evt.target.classList.contains('active') ? evt.target.innerText : '';
            this.character.updateCharClass(newClass);
        }
    }
}
</script>

<template>
    <div>
        <h5>Armor</h5>
        Choose the type of armor that your hero wears.

        <p>You have selected: {{ armorPicked }}</p>

        <div v-for="(armor, idx) in options.armorList" class="form-check">
            <input type="radio" name="armor-select" :id="`class-${armor.name}`" :value="`${armor.name}`"
                class="form-check-input" v-model="armorPicked" @change="handleChange" />
            <label :for="`class-${armor.name}`" class="form-check-label">{{ armor.name + ": " + armor.tooltip }}</label>
        </div>
    </div>

    <div>
        <hr />
        <h5>Weapons</h5>
        Choose the weapons that your hero wields. Select <i>one hand-to-hand weapon</i> and <i>one ranged weapon</i>.

        <p>
        <div>You have selected: {{ meleeWeaponPicked }}</div>
        <div>You have selected: {{ rangeWeaponPicked }}</div>
        </p>

        Hand-to-hand Weapons. Simple hand-to-hand weapons can be used by anyone. Advanced hand-to-hand weapons are more
        powerful, but can only be used by Clerics and Warriors.

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
                    <option v-if="!w.isSimple && w.attackAbility === 'str'"
                        :disabled="character.charClass !== 'cleric' && character.charClass !== 'warrior'">{{ w.name }}
                    </option>
                </template>
            </optgroup>
        </select>

        <br />

        Ranged Weapons. Simple ranged weapons can be used by anyone. Advanced ranged weapons are more powerful, but can only
        be used by Druids and Rangers.

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
                    <option v-if="!w.isSimple && w.attackAbility === 'dex'"
                        :disabled="character.charClass !== 'druid' && character.charClass !== 'ranger'">{{ w.name }}
                    </option>
                </template>
            </optgroup>
        </select>

        <!-- Simple hand-to-hand weapons: less powerful, can be used by anyone.
        <div v-for="(itm, idx) in options.simpleMeleeWeaponList" class="form-check">
            <input type="radio" name="melee-select" :id="`melee-${itm.name}`" :value="`${itm.name}`"
                class="form-check-input" v-model="meleeWeaponPicked" @change="handleChange" />
            <label :for="`melee-${itm.name}`" class="form-check-label">{{ itm.name }}</label>
        </div>

        Advanced hand-to-hand weapons: more powerful, available only to Clerics and Warriors.
        <div v-for="(itm, idx) in options.advancedMeleeWeaponList" class="form-check">
            <input type="radio" name="melee-select" :id="`melee-${itm.name}`" :value="`${itm.name}`"
                class="form-check-input" v-model="meleeWeaponPicked" @change="handleChange" />
            <label :for="`melee-${itm.name}`" class="form-check-label">{{ itm.name }}</label>
        </div>

        Simple ranged weapons: less powerful, can be used by anyone.
        <div v-for="(itm, idx) in options.simpleRangeWeaponList" class="form-check">
            <input type="radio" name="range-select" :id="`range-${itm.name}`" :value="`${itm.name}`"
                class="form-check-input" v-model="rangeWeaponPicked" @change="handleChange" />
            <label :for="`range-${itm.name}`" class="form-check-label">{{ itm.name }}</label>
        </div>

        Advanced ranged weapons: more powerful, available only to Druids and Rangers.
        <div v-for="(itm, idx) in options.advancedRangeWeaponList" class="form-check">
            <input type="radio" name="range-select" :id="`range-${itm.name}`" :value="`${itm.name}`"
                class="form-check-input" v-model="rangeWeaponPicked" @change="handleChange" />
            <label :for="`range-${itm.name}`" class="form-check-label">{{ itm.name }}</label>
        </div>
 -->

    </div>

    <div>
        <hr />
        <h5>Adventuring Gear</h5>
        Your hero has a <i>backpack</i> plus <i>5 items</i> from the list of adventuring gear below.

        <p>You have selected: {{ gearPicked }}</p>

        <div v-for="(itm, idx) in options.gearList" class="form-check">
            <input type="checkbox" name="gear-select" :id="`gear-${itm.name}`" :value="`${itm.name}`"
                class="form-check-input" v-model="gearPicked" @change="handleChange" />
            <label :for="`gear-${itm.name}`" class="form-check-label">{{ itm.name }}</label>
        </div>

        <!-- <LimitedCheckbox name="newgear" :items="options.gearList" :max-choices="5" @added="handleUpdate" /> -->
    </div>
</template>

<!--
<template>
    <p>Your character starts the adventure with... </p>

    <h5>Choose Your Weapons</h5>

    Hand-to-hand weapons are used in up-close combat.

    Simple Hand-to-hand Weapons can be used by anyone: daggers, hatchets, staffs, spears.
    (1d6 + STR)

    Advanced hand-to-hand weapons can be used by Clerics and Warriors: swords, battleaxes, warhammers.
    (2d6 + STR)

    Ranged weapons are used to shoot from a distance.

    Simple ranged weapons can be used by anyone: slingshot, light crossbow, shortbow.
    (1d6 + DEX)

    Advanced Ranged Weapons can be used by Druids and Rangers: heavy crossbow, longbow.
    (1d8 + DEX)

    <h5>Choose Your Armor</h5>

    Light Armor offers the least protection, can be worn by anyone.
    (12 + DEX)

    Medium Armor offers more protection, not available for Rogues or Wizards.
    (14 + DEX)

    Heavy Armor offers the most protection, only available to Clerics and Warriors.
    (16 + DEX)

    <h5>Choose Your Adventuring Gear</h5>

    Your character has a backpack and 5 pieces of adventuring gear.

    Crowbar
    Fishing Rod
    Grappling Hook
    Pole (10 feet long)
    Rope (50 feet long)
    Ball bearings (bag of 1000)
    Shovel
    Hammer & nails
    Hunting trap (spring-loaded)
    Signal horn/whistle
    Blanket
    Lantern & oil
    Magnifying glass
    Mirror (steel)
    Chain (10 feet long)
    Padlock & key
    Torches (10)
    Tinderbox
    Blanket
    Parchment & ink (1 vial)
    Glass jug & stopper (empty)
</template>
-->