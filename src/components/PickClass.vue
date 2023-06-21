
<script>
import { character } from '../models/character.js';
import { options } from '../models/options';

export default {
    data() {
        return {
            character,
            options,
        }
    },
    methods: {
        handleClick(evt) {
            // mark as inactive all buttons other than this one
            const activeButtons = document.querySelectorAll(`button.class-btn.active`);
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
    <p>Your hero's role on the team falls into one of six major categories, called their <i>character class.</i> Choose one
        of the following:</p>

    <div>
        <span v-for="(cls, idx) in options.classList" data-bs-toggle="tooltip" :title="cls.tooltip">
            <button type="button" class="btn btn-outline-primary m-1 class-btn" :id="`class-btn-${cls.name}`"
                data-bs-toggle="button" @click="handleClick">
                {{ cls.name }}
            </button>
        </span>
    </div>
</template>
