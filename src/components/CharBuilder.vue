
<script setup>
import PickClass from './PickClass.vue';
import PickAbilities from './PickAbilities.vue';
import PickSkills from './PickSkills.vue';
import PickEquipment from './PickEquipment.vue';
import PickIdentity from './PickIdentity.vue';
import ErrorBadge from './ErrorBadge.vue';
</script>

<script>
import { character } from '../models/character.js';
import { options } from '../models/options';

export default {
    components: {
        PickClass,
        PickAbilities,
        PickSkills,
        PickEquipment,
        PickIdentity,
        ErrorBadge
    },
    data() {
        return {
            character,
        }
    }
}
</script>

<template>
    <div class="accordion" id="accordionCharacter">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Step 1. Choose your hero's role on the team.
                    <ErrorBadge v-if="character.showErrors && character.classError" />
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickClass />
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Step 2. Rank your hero's abilities.
                    <ErrorBadge v-if="character.showErrors && character.abilityError" />
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickAbilities />
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Step 3. Pick your hero's special skills.
                    <ErrorBadge v-if="character.showErrors && character.skillError" />
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickSkills />
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Step 4. Select your hero's gear & equpiment.
                    <ErrorBadge v-if="character.showErrors && character.gearError" />
                </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickEquipment />
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingFive">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Step 5. Define your hero's identity.
                    <ErrorBadge v-if="character.showErrors && character.identityError" />
                </button>
            </h2>
            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickIdentity />
                </div>
            </div>
        </div>
    </div>
</template>