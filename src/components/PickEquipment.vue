
<script setup>
import LimitedCheckbox from './LimitedCheckbox.vue';
</script>

<script>
import { character } from '../models/character';
import { options } from '../models/options';

export default {
    data() {
        return {
            character,
            options,
        }
    },
    methods: {
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
        <div>
            <span v-for="(armor, idx) in options.armorList" data-bs-toggle="tooltip" :title="armor.tooltip">
                <button type="button" class="btn btn-outline-primary m-1 armor-btn" :id="`armor-btn-${armor.name}`"
                    data-bs-toggle="button" @click="handleClick">
                    {{ armor.name }}
                </button>
            </span>
        </div>
    </div>

    <div>
        <h5>Weapons</h5>
        Choose the weapons that your hero wields. Select <i>one hand-to-hand weapon</i> and <i>one ranged weapon</i>.

        Simple hand-to-hand weapons: less powerful, can be used by anyone.

        Advanced hand-to-hand weapons: more powerful, available only to Clerics and Warriors.


        Simple ranged weapons: less powerful, can be used by anyone.

        Advanced ranged weapons: more powerful, available only to Druids and Rangers.

    </div>

    <div>
        <h5>Adventuring Gear</h5>
        Your hero has a <i>backpack</i> plus <i>5 items</i> from the list of adventuring gear below.

        <!-- <p>You've got: {{ character.gear }}</p> -->

        <LimitedCheckbox name="newgear" :items="options.gearList" :max-choices="5" @added="handleUpdate" />
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