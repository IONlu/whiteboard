<template>
    <div
        :style="colorStyle"
        class="flex items-center justify-center border-gray-300 border-solid border rounded w-10 h-10"
        @click="$emit('click', $event)"
    >
        <div
            v-if="!color"
            :class="$style.transparent"
            class="text-3xl"
        >
            ×
        </div>
    </div>
</template>

<style module>
.transparent {
    color: rgba(0, 0, 0, 0.3)
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
