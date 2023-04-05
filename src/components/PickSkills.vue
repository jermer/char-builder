
<script setup>
import LimitedCheckbox from './LimitedCheckbox.vue'
</script >

<script>
import { character } from './character';

class Ability {
    constructor(name, ability, tooltip) {
        this.value = name;
        this.ability = ability;
        this.tooltip = tooltip;
    }
}

export default {
    data() {
        return {
            character,
            skillList: [
                new Ability("acrobatics", "dex",
                    "balancing, tumbling"),
                new Ability("athletics", "str",
                    "climbing, jumping, swimming"),
                new Ability("brawn", "str",
                    "lifting, pushing, breaking"),
                new Ability("deception", "cha",
                    "misleading, conning, lying"),
                new Ability("insight", "wis",
                    "reading someone's intentions"),
                new Ability("intimidation", "str",
                    "threatening, convincing"),
                new Ability("investigation", "int",
                    "searching, making deductions"),
                new Ability("medicine", "int",
                    "diagnosing, applying first aid"),
                new Ability("nature & survival", "wis",
                    "tracking, hunting, navigating"),
                new Ability("perception", "wis",
                    "detecting, noticing, sensing"),
                new Ability("performance", "cha",
                    "entertaining, mimicking"),
                new Ability("persuasion", "cha",
                    "influencing, negotiating"),
                new Ability("recollection", "int",
                    "remembering facts about the world"),
                new Ability("sleight of hand", "dex",
                    "picking pockets, or locks"),
                new Ability("stealth", "dex",
                    "sneaking, hiding"),
            ],
            // skills: []
        }
    },
    methods: {
        handleUpdate(arr) {
            // this.skills = [...arr];
            this.character.updateSkills(arr);
        }
    }
}
</script>

<template>
    <p>Choose <i>four</i> of these skills that you imagine your character is especially good at.</p>

    <p>You've got: {{ character.skills }}</p>

    <LimitedCheckbox name="newskills" :items="skillList" :max-choices="4" @added="handleUpdate" />
</template>
