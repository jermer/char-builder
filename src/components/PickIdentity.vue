
<script>
import { character } from '../models/character';

export default {
    data() {
        return {
            character,
            charsMax: 150,
            charsUsed: 0
        }
    },
    methods: {
        handleUpdate(evt) {
            if (evt.target.name === 'heroName') {
                character.updateName(evt.target.value);
            }
            else if (evt.target.name === 'heroPronouns') {
                character.updatePronouns(evt.target.value);
            }
            else if (evt.target.name === 'heroDesc') {
                character.updateDescription(evt.target.value);
                this.charsUsed = evt.target.value.length;
            }
        }
    }
}
</script>

<template>
    <p>Think about all of the decisions and selections that you have made so far as you choose your hero's name, pronouns,
        and short description.</p>

    <div class="mb-3">
        <label for="hero-name" class="form-label">Your hero's name</label>
        <input type="text" class="form-control" id="hero-name" name="heroName" @input="handleUpdate" />
    </div>
    <div class="mb-3">
        <label for="hero-pronouns" class="form-label">Your hero's pronouns</label>
        <input type="text" class="form-control" id="hero-pronouns" name="heroPronouns" @input="handleUpdate" />
    </div>
    <div class="mb-3">
        <label for="hero-description" class="form-label">What is the first thing people notice about your hero?</label>
        <textarea class="form-control" id="hero-description" name="heroDesc" @input="handleUpdate" :maxlength="charsMax"
            rows="3"></textarea>
        <div id="descriptionHelpBlock" class="form-text">
            {{ charsUsed + ' of ' + charsMax }}
        </div>
    </div>
</template>