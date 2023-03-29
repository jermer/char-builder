<!-- 
    LimitedCheckbox

    Component that renders a collection of connected checkbox inputs,
    and enforces a maximum number of checkboxes that can be selected.
 -->

<script>
import PopperWrapper from './PopperWrapper.vue';

export default {
    emits: ["added"],
    props: {
        name: String,
        items: Array,
        // checked: Array,
        maxChoices: Number
    },
    data() {
        return {
            numChoices: 0,
            checkedItems: []
        };
    },
    methods: {
        validateCheck(evt) {
            console.log("NEW CHECKIE CHECKIE");
            this.checkedItems = [];
            // while (this.checked.length)
            //     this.checked.pop();
            // for (const el of document
            //     .getElementsByClassName('form-check-input')) {
            for (const el of document
                .querySelectorAll(`.form-check-input[name=${this.name}]`)) {
                if (el.checked) {
                    this.checkedItems.push(el.value);
                    // this.$emit('added', el.value)
                    // this.numChoices++
                }
            }
            if (this.checkedItems.length > this.maxChoices) {
                console.log("TOO MANY!");
                // uncheck the last checked thing
                evt.target.checked = false;
                // this.numChoices--;
                // remove the value from state
                this.checkedItems = [...this.checkedItems.filter(val => val !== evt.target.value)];
            }
            this.$emit("added", this.checkedItems);
            // console.debug("Checked:", this.checked)
        }
    },
    components: { PopperWrapper }
}
</script>

<template>
    <div class="form-check" @change="validateCheck">
        <div v-for="(item, idx) in items">
            <input type="checkbox" class="form-check-input" :name="name" :id="name + '-item-' + idx" :value="item.value" />
            <PopperWrapper :content="item.tooltip" :hover="true" placement="right">
                <label class="form-check-label" :for="name + '-item-' + idx">{{ item.value }}</label>
            </PopperWrapper>
        </div>
    </div>
</template>
