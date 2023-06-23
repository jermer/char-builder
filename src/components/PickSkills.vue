
<script setup>
import LimitedCheckbox from './LimitedCheckbox.vue'
</script >

<script>
import { character } from '../models/character';
import { options } from '../models/options';

export default {
    data() {
        return {
            skillsPicked: [],
            character,
            options,
        }
    },
    methods: {
        handleChange(evt) {
            // update the character object in state
            this.character.updateSkills(this.skillsPicked);

            // enforce the limit on number of checkboxes
            if (this.skillsPicked.length >= 4) {
                // disable all unselected checkboxes
                document.querySelectorAll("input[name=skill-select]:not(:checked)").forEach(el => el.setAttribute('disabled', ''))
            } else {
                // enable all checkboxes
                document.querySelectorAll("input[name=skill-select]").forEach(el => el.removeAttribute('disabled', ''))
            }
        }
    }
}
</script>

<template>
    <p>Choose <i>four</i> of these skills that you imagine your character is especially good at.</p>

    <!-- <div>You've got: {{ skillsPicked }}</div> -->
    <p>You have selected: {{ character.skills }}</p>

    <div v-for="(skill, idx) in options.skillList" class="form-check">
        <input type="checkbox" name="skill-select" :id="`skill-${skill.fieldName}`" :value="`${skill.fieldName}`"
            class="form-check-input" v-model="skillsPicked" @change="handleChange" />
        <label :for="`skill-${skill.name}`" class="form-check-label">{{ skill.name + "(" + skill.tooltip + ")"
        }}</label>
    </div>

    <!-- <LimitedCheckbox name="newskills" :items="options.skillList" :max-choices="4" @added="handleUpdate" /> -->
</template>
