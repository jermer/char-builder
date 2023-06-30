
<script>
import { getCharacter } from '../models/character';
import { options } from '../models/options';

export default {
    props: ['showErrors'],
    setup() {
        const { char, skillsError, updateCharacter } = getCharacter();
        return { char, skillsError, updateCharacter };
    },
    data() {
        return {
            skillsPicked: [],
            options,
        }
    },
    methods: {
        handleChange(evt) {
            this.updateCharacter({ skills: this.skillsPicked });

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
    <!-- Instructions -->
    <p>Choose <i>four</i> of these skills that you imagine your character is especially good at.</p>

    <!-- Error message -->
    <div v-if="showErrors && skillsError" class="alert alert-warning">
        {{ skillsError }}
    </div>

    <!-- Debugging -->
    <!-- <div class="alert alert-secondary">You have selected: {{ char.skills }}</div> -->

    <!-- Render list of checkboxes, users can pick a maximum of 4 -->
    <div v-for="(skill, idx) in options.skillList" class="form-check">
        <input type="checkbox" name="skill-select" :id="`skill-${skill.fieldName}`" :value="`${skill.fieldName}`"
            class="form-check-input" v-model="skillsPicked" @change="handleChange" />
        <label :for="`skill-${skill.name}`" class="form-check-label">{{ skill.name + " (" + skill.tooltip + ")"
        }}</label>
    </div>
</template>
