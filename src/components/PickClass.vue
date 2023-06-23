
<script>
import { character } from '../models/character.js';
import { options } from '../models/options';

export default {
    data() {
        return {
            classPicked: "nothing yet!",
            character,
            options,
        }
    },
    methods: {
        handleChange(evt) {
            this.character.updateCharClass(this.classPicked);
        },
        // handleClick(evt) {
        //     // mark as inactive all buttons other than this one
        //     const activeButtons = document.querySelectorAll(`button.class-btn.active`);
        //     activeButtons.forEach(b => {
        //         if (b.id !== evt.target.id)
        //             b.classList.remove('active');
        //     });
        //     // update the character in state
        //     const newClass = evt.target.classList.contains('active') ? evt.target.innerText : '';
        //     this.character.updateCharClass(newClass);
        // }
    }
}
</script>

<template>
    <p>Your hero's role on the team falls into one of six major categories, called their <i>character class.</i> Choose one
        of the following:</p>

    <!-- <div>Picked: {{ classPicked }}</div> -->
    <p>You have selected: {{ character.charClass }}</p>

    <div v-for="(cls, idx) in options.classList" class="form-check">
        <input type="radio" name="class-select" :id="`class-${cls.name}`" :value="`${cls.name}`" class="form-check-input"
            v-model="classPicked" @change="handleChange" />
        <label :for="`class-${cls.name}`" class="form-check-label">{{ cls.name + ": " + cls.tooltip }}</label>
    </div>

    <!-- <div>
        <span v-for="(cls, idx) in options.classList" data-bs-toggle="tooltip" :title="cls.tooltip">
            <button type="button" class="btn btn-outline-primary m-1 class-btn" :id="`class-btn-${cls.name}`"
                data-bs-toggle="button" @click="handleClick">
                {{ cls.name }}
            </button>
        </span>
    </div> -->
</template>
