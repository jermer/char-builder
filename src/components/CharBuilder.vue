
<script setup>
import PickClass from './PickClass.vue';
import PickAbilities from './PickAbilities.vue';
import PickSkills from './PickSkills.vue';
import PickEquipment from './PickEquipment.vue';
</script>

<script>
export default {
    components: {
        PickClass,
        PickAbilities,
        PickSkills,
        PickEquipment
    },
}
</script>

<template>
    <div class="accordion" id="accordionCharacter">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Step 1. Decide your character's role on the team.
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
                    Step 2. Assign ability scores.
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
                    Step 3. Choose skill proficiencies.
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
                    Step 4. Get gear & equpiment.
                </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                data-bs-parent="#accordionCharacter">
                <div class="accordion-body">
                    <PickEquipment />
                </div>
            </div>
        </div>
    </div>
</template>