<template>
    <div
        :style="containerStyle"
        :class="$style.container"
        class="bg-white border-gray-300 border-solid border rounded-lg p-3"
    >
        <slot />
    </div>
</template>

<style module>
    .container {
        display: grid;
        grid-gap: 0.75rem;
    }
</style>

<script>
export default {
    props: {
        columns: {
            type: Number,
            default: 1
        }
    },

    computed: {
        containerStyle () {
            return {
                'grid-template-columns': `repeat(${this.columns}, auto)`
            }
        }
    }
}
</script>
