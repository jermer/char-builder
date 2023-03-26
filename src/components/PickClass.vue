
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
            selectedClass: ''
        }
    },
    computed: {
        selectedDesc() {
            const cls = this.charClasses.find(c => c.name === this.selectedClass);
            if (cls)
                return cls.desc;
            return '(select a character class)';
        }
    },
    methods: {
        handleChange() {
            this.character.updateCharClass(this.selectedClass);
        }
    }
}
</script>

<template>
    <p>Your character's role on the team is called their <i>character class.</i> Choose one of the following:</p>

    <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="form-check" v-for="cls in charClasses" @change="handleChange">
                        <input type="radio" class="form-check-input" :id="cls.name" :value="cls.name"
                            v-model="selectedClass" />
                        <label class="form-check-label">{{ cls.name[0].toLocaleUpperCase() + cls.name.slice(1) }}</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <div v-if="selectedClass" class="card-body">
                    <h5 class="card-title">{{ selectedClass.toLocaleUpperCase() }}</h5>
                    <p class="card-text">{{ selectedDesc }}</p>
                </div>
                <div v-else class="card-body">
                    <i class="text-muted">select a class</i>
                </div>
            </div>
        </div>
    </div>
</template>