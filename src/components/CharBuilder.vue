
<script setup>
import PickClass from './PickClass.vue';
import PickAbilities from './PickAbilities.vue';
import PickSkills from './PickSkills.vue';
import PickEquipment from './PickEquipment.vue';
import PickIdentity from './PickIdentity.vue';
import ErrorBadge from './ErrorBadge.vue';
</script>

<script>
// import { character } from '../models/character.js';
import { getCharacter } from '../models/character.js';
import { options } from '../models/options';

export default {
    props: ['showErrors'],
    components: {
        PickClass,
        PickAbilities,
        PickSkills,
        PickEquipment,
        PickIdentity,
        ErrorBadge
    },
    data() {
        const {
            characterClassError,
            abilitiesError,
            skillsError,
            equipmentError,
            identityError } = getCharacter();
        return {
            // character,
            characterClassError,
            abilitiesError,
            skillsError,
            equipmentError,
            identityError
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
                    <strong>Step 1.</strong>&nbsp; Choose your hero's role on the team.
                    <ErrorBadge v-if="showErrors && characterClassError" />
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickClass :showErrors="showErrors" />
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <strong>Step 2.</strong>&nbsp; Rank your hero's abilities.
                    <ErrorBadge v-if="showErrors && abilitiesError" />
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickAbilities :showErrors="showErrors" />
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <strong>Step 3.</strong>&nbsp; Pick your hero's special skills.
                    <ErrorBadge v-if="showErrors && skillsError" />
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickSkills :showErrors="showErrors" />
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    <strong>Step 4.</strong>&nbsp; Select your hero's gear & equpiment.
                    <ErrorBadge v-if="showErrors && equipmentError" />
                </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickEquipment :showErrors="showErrors" />
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingFive">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    <strong>Step 5.</strong>&nbsp; Establish your hero's identity.
                    <ErrorBadge v-if="showErrors && identityError" />
                </button>
            </h2>
            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickIdentity :showErrors="showErrors" />
                </div>
            </div>
        </div>
    </div>
</template>