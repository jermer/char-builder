
<script>
import { getCharacter } from '../models/character.js';
import { options } from '../models/options.js';

export default {
    props: ['showErrors'],
    setup() {
        const { character, abilitiesError, updateCharacter } = getCharacter();
        return { character, abilitiesError, updateCharacter };
    },
    data() {
        return {
            options,
            displayRanking: this.character.abilityRanking,
        }
    },

    methods: {

        upArrowClick(evt) {
            const abilityButton = evt.target.closest('.ability-button');
            const idx = +abilityButton.dataset['index'];

            // if we're at the start of the list, do nothing
            if (idx <= 0)
                return;

            // swap the current entry and the one before it
            const temp = this.displayRanking[idx];
            this.displayRanking[idx] = this.displayRanking[idx - 1];
            this.displayRanking[idx - 1] = temp;

            this.updateCharacter({ abilityRanking: this.displayRanking });
        },
        downArrowClick(evt) {
            const abilityButton = evt.target.closest('.ability-button');
            const idx = +abilityButton.dataset['index'];

            // if we're at the end of the list, do nothing
            if (idx >= 5)
                return;

            // swap the current entry and the one after it
            const temp = this.displayRanking[idx];
            this.displayRanking[idx] = this.displayRanking[idx + 1];
            this.displayRanking[idx + 1] = temp;

            this.updateCharacter({ abilityRanking: this.displayRanking });
        }
    }
}
</script>

<template>
    <!-- Instructions -->
    <p>Your hero has six <i>abilities</i> that they use to interact with the world.
    </p>

    <p>Click
        <font-awesome-icon :icon="['fas', 'circle-arrow-up']" /> <font-awesome-icon :icon="['fas', 'circle-arrow-down']" />
        to rank the six abilities in terms of how skilled your hero is with that kind of thing. Put your hero's strongest
        ability at the top of the list, and their weakest
        ability at the bottom.
    </p>

    <p v-if="character.characterClass">As a <b>{{ character.characterClass }}</b>, consider
        putting <b>{{ options.abilityNames[options.abilityPresets[character.characterClass][0]] }}</b> at the top of your
        ability list, but it's totally up to you!</p>
    <p v-else>Make a selection in Step 1 for a suggestion about what to put at the top of your ability list.</p>

    <table>
        <tr v-for="(item, idx) in  this.displayRanking ">
            <td>
                <div class="card ability-button" :data-label="item" :data-index="idx">
                    <div class="card-body">
                        <h6 class="card-title">
                            <b>{{ options.abilityNames[item] }} ({{ item.toUpperCase() }})</b>
                            <div class="float-end">
                                <font-awesome-icon :icon="['fas', 'circle-arrow-up']" @click="upArrowClick" class="me-1"
                                    :class="idx === 0 ? 'disabled-arrow' : 'active-arrow'" />
                                <font-awesome-icon :icon="['fas', 'circle-arrow-down']" @click="downArrowClick"
                                    :class="idx >= 5 ? 'disabled-arrow' : 'active-arrow'" />
                            </div>
                        </h6>
                        <p class="card-text">
                            <i>{{ options.abilityDescriptions[item] }}</i>
                        </p>


                    </div>
                </div>
            </td>
        </tr>
    </table>
</template>

<style>
.disabled-arrow {
    color: gray;
}

.active-arrow {
    color: black;
}
</style>