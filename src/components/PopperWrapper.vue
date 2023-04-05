
<template></template>

<!-- 
    PopperWrapper

    Component that sets default properties styles for Popper components.

    See: https://valgeirb.github.io/vue3-popper/guide/getting-started.html#how-can-i-wrap-popper-with-my-own-component

<script>
import { defineComponent } from "vue";
import Popper from "vue3-popper";

export default defineComponent({
    name: "MyPopperWrapper",
    components: {
        Popper,
    },
});
</script>

<template>
    <Popper v-bind="$attrs" hover openDelay="100" closeDelay="100">
        <slot />
        <template #content="props">
            <slot name="content" v-bind="props" />
        </template>
    </Popper>
</template>

<style>
:root {
    --popper-theme-background-color: #333333;
    --popper-theme-background-color-hover: #333333;
    --popper-theme-text-color: #ffffff;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 12px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>

-->