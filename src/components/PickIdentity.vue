
<script>
import { getCharacter } from '../models/character';
// import { character } from '../models/character';

export default {
    props: ['showErrors'],
    setup() {
        const { char, identityError, updateCharacter } = getCharacter();
        return { char, identityError, updateCharacter };
    },
    data() {
        return {
            // character,
            name: '',
            pronouns: '',
            description: '',
            charsMax: 150,
            charsUsed: 0
        }
    },
    methods: {
        handleUpdate(evt) {
            this.updateCharacter({
                name: this.name,
                pronouns: this.pronouns,
                description: this.description,
            })

            if (evt.target.name === 'heroDesc') {
                this.charsUsed = evt.target.value.length;
            }
        }
    }
}
</script>

<template>
    <!-- Instructions -->
    <p>Think about all of the decisions and selections that you have made so far as you choose your hero's name, pronouns,
        and short description.</p>

    <!-- Error message -->
    <div v-if="showErrors && identityError" class="alert alert-warning">
        {{ identityError }}
    </div>

    <!-- Render text fields -->
    <div class="mb-3">
        <label for="hero-name" class="form-label">Your hero's name</label>
        <input type="text" class="form-control" id="hero-name" name="heroName" v-model="name" @input="handleUpdate" />
    </div>
    <div class="mb-3">
        <label for="hero-pronouns" class="form-label">Your hero's pronouns</label>
        <input type="text" class="form-control" id="hero-pronouns" name="heroPronouns" v-model="pronouns"
            @input="handleUpdate" />
    </div>
    <div class="mb-3">
        <label for="hero-description" class="form-label">What is the first thing people notice about your hero?</label>
        <textarea class="form-control" id="hero-description" name="heroDesc" v-model="description" @input="handleUpdate"
            :maxlength="charsMax" rows="3"></textarea>
        <div id="descriptionHelpBlock" class="form-text">
            {{ charsUsed + ' of ' + charsMax }}
        </div>
    </div>
</template>