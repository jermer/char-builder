
<script>
import { character } from './character.js';

export default {
    mounted() {
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
            console.debug("dropped!");
            target.dispatchEvent(new Event("drop"));
        });
        drake.on('drag', function (el, target, source, sibling) {
            console.debug("dragged!");
        });
        drake.on('cancel', function (el, container, source) {
            console.debug("cancelled!")
        });
    },
    data() {
        return {
            character,
            // scoreLabels: ['str', 'dex', 'con', 'int', 'wis', 'cha'],
            scoreLabels: character.abilityLabels,
            update: 0,
        }
    },
    computed: {
        abilityScoresFinal() {
            this.update;
            const scoreArray = [];
            for (const score of this.scoreLabels) {
                // console.log(score);
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
        abilityModifiers() {
            return this.abilityScoresFinal.map(score => {
                if (score === '--')
                    return '--'
                const mod = Math.floor(score / 2) - 5;
                return mod < 0 ? `${mod}` : `+${mod}`;
            })
        }
    },
    methods: {
        recalc() {
            console.debug("Recalculating!");
            this.update++;
            character.updateAbilityScores(
                this.abilityScoresFinal,
                this.abilityModifiers
            );
        }
    }
}
</script>

<template>
    <p>Your character has six <i>ability scores</i> that describe their attributes.</p>

    <p>Arrange the six numbers (blue squares) among your character's six ability scores by dragging them into the table
        below.</p>

    <p>You also have three bonus points (green circles) that you can distribute among the ability scores.</p>

    <div class='card'>
        <div id="tile-container" class="card-body">
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

    <table class="table">
        <thead>
            <tr>
                <td></td>
                <td></td>
                <td>Total</td>
                <td>Modifier</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(score, idx) in scoreLabels">
                <th scope="row">{{ score.toUpperCase() }}</th>
                <td>
                    <div :id="score" class="score-drop" @drop="recalc"> (drag tiles here)</div>
                </td>
                <td>{{ abilityScoresFinal[idx] }}</td>
                <td>{{ abilityModifiers[idx] }}</td>
            </tr>

        </tbody>
    </table>
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
    height: 3rem;
    width: 3rem;
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