
<script>
import { character } from './character.js';

export default {
    data() {
        return {
            character,
            charClasses: [
                { name: "cleric", desc: "front-line fighter who also channels healing magic" },
                { name: "druid", desc: "magic-user who embodies the primal power of nature" },
                { name: "ranger", desc: "long-range fighter with superior wildnerness skills" },
                { name: "rogue", desc: "shadowy figure with a talent for sneaking and subterfuge" },
                { name: "warrior", desc: "front-line fighter who can inspire their allies" },
                { name: "wizard", desc: "magic-user with a broad variety of arcane skills" }
            ],
            // selectedClass: ''
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
    <p>Your character's role on the team is called their <i>character class.</i> Choose one of the following:</p>

    <div>
        <span v-for="(cls, idx) in charClasses" data-bs-toggle="tooltip" :title="cls.desc">
            <button type="button" class="btn btn-outline-primary m-1 class-btn" :id="`class-btn-${cls.name}`"
                data-bs-toggle="button" @click="handleClick">
                {{ cls.name }}
            </button>
        </span>
    </div>
</template>
