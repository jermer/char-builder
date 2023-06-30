
<script>
import { getCharacter } from '../models/character';
import { options } from '../models/options';

export default {
    props: ['showErrors'],
    setup() {
        const { char, characterClassError, updateCharacter } = getCharacter();
        return { char, characterClassError, updateCharacter };
    },
    data() {
        return {
            classPicked: "nothing yet!",
            options,
        }
    },
    methods: {
        handleChange(evt) {
            this.updateCharacter({ characterClass: this.classPicked });
        },
    }
}
</script>

<template>
    <!-- Instructions -->
    <p>Your hero's role on the team falls into one of six major categories, called their <i>character class.</i> Choose one
        of the following:</p>

    <!-- Error message -->
    <div v-if="showErrors && characterClassError" class="alert alert-warning">
        {{ characterClassError }}
    </div>

    <!-- Debugging -->
    <!-- <div class="alert alert-secondary">You have selected: {{ char.characterClass }}</div> -->

    <!-- Render list of radio buttons -->
    <div v-for="(cls, idx) in options.classList" class="form-check">
        <input type="radio" name="class-select" :id="`class-${cls.name}`" :value="`${cls.name}`" class="form-check-input"
            v-model="classPicked" @change="handleChange" />
        <label :for="`class-${cls.name}`" class="form-check-label">
            {{ cls.name + ": " + cls.tooltip }}
        </label>
    </div>
</template>
