<!-- 
    LimitedCheckbox

    Component that renders a collection of connected checkbox inputs,
    rendered as a button array, and enforces a maximum number of
    checkboxes that can be selected.
 -->

<script>
// import PopperWrapper from './PopperWrapper.vue';

import { Tooltip } from 'bootstrap';

export default {
    mounted() {
        // Enable tooltips
        Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            .forEach(tooltipNode => new Tooltip(tooltipNode))
    },
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
        handleClick(evt) {
            const activeButtons = document.querySelectorAll(`button.active[name=${this.name}]`);
            // const numUnchecked = document.querySelectorAll('button:not(.active)').length;

            if (activeButtons.length >= this.maxChoices) {
                // we are at the limit, disable all unchecked buttons.
                document.querySelectorAll(`button:not(.active)[name=${this.name}]`).forEach(el => el.setAttribute('disabled', ''))
            } else {
                // we are under the limit, all unchecked boxes are clickable
                document.querySelectorAll(`button:not(.active)[name=${this.name}]`).forEach(el => el.removeAttribute('disabled', ''))
            }

            // update the list in state
            this.checkedItems = []
            activeButtons.forEach(function (currentValue) {
                this.checkedItems.push(currentValue.innerText);
            }, this);

            this.$emit("added", this.checkedItems);
            // console.log('CHECKED:', this.checkedItems);
        },

        /*
                validateCheck(evt) {
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
        */

    }
}

</script>

<template>
    <div>
        <span v-for="(item, idx) in items" data-bs-toggle="tooltip" :title="item.tooltip">
            <button type="button" class="btn btn-outline-primary m-1" data-bs-toggle="button" @click="handleClick"
                :name="name">
                {{ item.value }}
            </button>
        </span>
    </div>
</template>


<!-- VERSION WITHOUT TOOLTIPS -->
<!--
<div>
    <button v-for="(item, idx) in items" type="button" class="btn btn-outline-primary m-1" data-bs-toggle="button"
        @click="handleClick">
        {{ item.value }}
    </button>
</div>
-->

<!--
    <hr />


    <div>
        <span v-for="(item, idx) in items" class="m-1" data-bs-toggle="tooltip" data-bs-placement="left"
            title="Tooltip on left">
            <input type="checkbox" class="btn-check" autocomplete="off" :name="name" :id="name + '-item-' + idx"
                :value="item.value" @click="handleClick">
            <label class="btn btn-outline-primary" :for="name + '-item-' + idx">{{ item.value }}</label>
        </span>
    </div>

    <hr />

    <div>
        <span v-for="(item, idx) in items" class="m-1">
            <PopperWrapper :content="item.tooltip" :hover="true" placement="right">
                <input type="checkbox" class="btn-check" autocomplete="off" :name="name" :id="name + '-item-' + idx"
                    :value="item.value">
                <label class="btn btn-outline-primary" :for="name + '-item-' + idx">{{ item.value }}</label><br>
            </PopperWrapper>
        </span>
    </div>

    <hr />

    <div class="form-check check-container" @change="validateCheck">
        <div v-for="(item, idx) in items">
            <div v-if="item.tooltip">
                <PopperWrapper :content="item.tooltip" :hover="true" placement="right">
                    <input type="checkbox" class="form-check-input" :name="name" :id="name + '-item-' + idx"
                        :value="item.value" />
                    <label class="form-check-label" :for="name + '-item-' + idx">{{ item.value }}</label>
                </PopperWrapper>
            </div>
            <div v-else>
                <input type="checkbox" class="form-check-input" :name="name" :id="name + '-item-' + idx"
                    :value="item.value" />
                <label class="form-check-label" :for="name + '-item-' + idx">{{ item.value }}</label>
            </div>
        </div>
    </div></template>

<style>.check-container {
    columns: 2;
}</style>

-->