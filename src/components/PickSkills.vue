
<script setup>
import LimitedCheckbox from './LimitedCheckbox.vue'
</script >

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
            this.character.updateSkills(arr);
        }
    }
}
</script>

<template>
    <p>Choose <i>four</i> of these skills that you imagine your character is especially good at.</p>

    <!-- <p>You've got: {{ character.skills }}</p> -->

    <LimitedCheckbox name="newskills" :items="options.skillList" :max-choices="4" @added="handleUpdate" />
</template>
