
<script setup>
import LimitedCheckbox from './LimitedCheckbox.vue'
</script >

<script>
class Ability {
    constructor(name, ability, tooltip) {
        this.value = name;
        this.ability = ability;
        this.tooltip = "Get a boost to " + ability.toUpperCase() + " actions like " + tooltip;
    }
}

export default {
    data() {
        return {
            skillList: [
                new Ability("athletics", "str",
                    "climbing, jumping, or swimming"),
                new Ability("brawn", "str",
                    "lifting, pushing, pulling, breaking"),
                new Ability("intimidation", "str",
                    "threatening, convincing"),
                new Ability("stealth", "dex",
                    "sneaking, hiding"),
                new Ability("acrobatics", "dex",
                    "balancing, tumbling"),
                new Ability("sleight of hand", "dex",
                    "trickery, picking pockets, picking locks"),
                new Ability("investigation", "int",
                    "searching, making deductions"),
                new Ability("recollection", "int",
                    "remembering facts about history, traditions, creatures"),
                new Ability("medicine", "int",
                    "diagnosing, applying first aid"),
                new Ability("perception", "wis",
                    "detecting, noticing, sensing"),
                new Ability("insight", "wis",
                    "reading someone's intentions"),
                new Ability("nature & survival", "wis",
                    "tracking, hunting, navigating"),
                new Ability("persuasion", "cha",
                    "influencing, negotiating"),
                new Ability("deception", "cha",
                    "misleading, conning, lying"),
                new Ability("performance", "cha",
                    "entertaining, mimicking"),

            ],
            skills: []
        }
    },
}
</script>

<template>
    <p>Choose <i>four</i> of these skills that you imagine your character is especially good at.</p>

    <p>You've got: {{ skills }}</p>

    <LimitedCheckbox name="newskills" :items="skillList" :max-choices="4" @added="(arr) => this.skills = [...arr]" />
</template>
