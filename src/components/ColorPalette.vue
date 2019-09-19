<template>
    <tool-box :columns="4">
        <color-bubble
            v-for="color in colors"
            :key="color"
            :color="color"
            @click="onClick(color)"
        />
    </tool-box>
</template>

<script>
import ToolBox from './ToolBox'
import ColorBubble from './ColorBubble'

export default {
    components: {
        ToolBox,
        ColorBubble
    },

    props: {
        colors: {
            type: Array,
            required: true
        }
    },

    methods: {
        onClick (color) {
            this.$emit('select', color)
        }
    }
}
</script>
