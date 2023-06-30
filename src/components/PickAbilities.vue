
<script>
import { getCharacter } from '../models/character.js';
import { options } from '../models/options.js';

export default {
    props: ['showErrors'],
    setup() {
        const { char, abilitiesError, updateCharacter } = getCharacter();
        return { char, abilitiesError, updateCharacter };
    },
    mounted() {
        // set up drag and drop
        const options = {
            accepts: function (el, target, source, sibling) {
                // can't drop into a score tile into a score-drop container that already contains a score-tile
                if (el.classList.contains('score-tile') && target.classList.contains('score-drop')) {
                    for (const child of target.children)
                        if (child.classList.contains('score-tile'))
                            return false;
                }
                return true;
            },
        }
        const drake = dragula([
            document.getElementById("tile-container"),
            ...document.getElementsByClassName("score-drop")
        ], options)
        drake.on('drop', function (el, target, source, sibling) {
            target.dispatchEvent(new Event("drop"));
        });
    },
    data() {
        return {
            options,
            update: 0,
        }
    },
    computed: {
        abilityScoreTotals() {
            this.update;
            const scoreArray = [];
            for (const score of this.options.abilityLabels) {
                const el = document.getElementById(score);
                if (el && el.children.length) {
                    let total = 0;
                    for (const child of el.children) {
                        total += +child.innerText;
                    }
                    scoreArray.push(total);
                }
                else {
                    scoreArray.push('--')
                }
            }
            return scoreArray;
        },
    },
    methods: {
        recalc() {
            // force the computed property to recalculate
            // could this be done with a watcher?
            this.update++;
            this.updateCharacter({ abilityScores: this.abilityScoreTotals });
        }
    }
}
</script>

<template>
    <!-- Instructions -->
    <p>Your hero has six <i>ability scores</i> that describe their attributes numerically. The higher the number, the more
        skilled your hero is at that type of thing.</p>

    <p>Distribute the six numbers (blue squares) among your character's ability scores by dragging them under the headings
        below.</p>

    <p>You also have three bonus points (green circles) that you can use to boost your ability scores however you like.
    </p>

    <!-- Error message -->
    <div v-if="showErrors && abilitiesError" class="alert alert-warning">
        {{ abilitiesError }}
    </div>

    <!-- Render drag and drop interface for ability scores -->
    <div class='card'>
        <div id="tile-container" class="card-body" @drop="recalc">
            <div class="score-tile">15</div>
            <div class="score-tile">14</div>
            <div class="score-tile">13</div>
            <div class="score-tile">12</div>
            <div class="score-tile">10</div>
            <div class="score-tile">8</div>
            <div class="bonus-tile">+1</div>
            <div class="bonus-tile">+1</div>
            <div class="bonus-tile">+1</div>
        </div>
    </div>

    <div class="container text-center">
        <div class="row">
            <div class="col-sm-4" v-for="(score, idx) in options.abilityLabels">
                <div class="card my-2">
                    <h5 class="card-header" data-bs-toggle="tooltip" :data-bs-title="options.abilityTooltips[idx]"> {{
                        score.toUpperCase()
                        + " " + abilityScoreTotals[idx] }}</h5>
                    <div :id="score" class="card-body score-drop" @drop="recalc"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
#tile-container {
    background-color: aliceblue;
    display: table-row;
    justify-content: center;
}

.score-drop {
    background-color: aliceblue;
    display: table-row;
    justify-content: center;
}

.score-tile {
    background-color: lightskyblue;
    /* display: flex; */
    display: table-cell;
    justify-content: center;
    vertical-align: middle;
    list-style-type: none;
    transition: all 0.3s;
    /* margin: 0.4rem; */
    height: 3rem;
    width: 3rem;
    border: #000013 0.15rem solid;
    border-radius: 0.2rem;
    cursor: move;
    text-align: center;
    vertical-align: middle;
}

.bonus-tile {
    background-color: yellowgreen;
    /* display: flex; */
    display: table-cell;
    justify-content: center;
    vertical-align: middle;
    list-style-type: none;
    transition: all 0.3s;
    margin: 0.4rem;
    height: 3rem;
    width: 3rem;
    border: #000013 0.15rem solid;
    border-radius: 1rem;
    cursor: move;
    text-align: center;
    vertical-align: middle;
}
</style>