<template>
    <div
        :style="colorStyle"
        :class="$style.container"
        class="flex items-center justify-center border-gray-300 border-solid border rounded w-10 h-10"
    />
</template>

<style module>
.container:before {
    content: '×';
    font-size: 2em;
    z-index: -1;
}
</style>

<script>
export default {
    props: {
        color: {
            type: String,
            default: undefined
        }
    },

    computed: {
        colorStyle () {
            return {
                background: this.color || 'transparent'
            }
        }
    }
}
</script>
