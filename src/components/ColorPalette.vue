<template>
    <tool-box
        :columns="columns"
    >
        <color-bubble
            v-for="color in colors"
            :key="color"
            :color="color"
            @click="onClick(color)"
        />
        <color-picker
            :style="colorPickerStyle"
            v-bind="colorPicker"
            @input="onColorPickerInput"
            @change="onColorPickerChange"
        />
    </tool-box>
</template>

<script>
import chroma from 'chroma-js'
import ToolBox from './ToolBox'
import ColorBubble from './ColorBubble'
import ColorPicker from '@radial-color-picker/vue-color-picker'
import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css'

export default {
    components: {
        ToolBox,
        ColorBubble,
        ColorPicker
    },

    props: {
        colors: {
            type: Array,
            required: true
        }
    },

    data () {
        return {
            columns: 6,
            colorPicker: {
                variant: 'persistent',
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1
            }
        }
    },

    computed: {
        colorPickerStyle () {
            return {
                gridColumn: `span ${this.columns}`
            }
        }
    },

    methods: {
        onClick (color) {
            this.$emit('select', color)
        },

        onColorPickerChange (hue) {
            this.$emit('select', chroma.hsl(
                hue,
                this.colorPicker.saturation / 100,
                this.colorPicker.luminosity / 100
            ).hex())
        },

        onColorPickerInput (hue) {
            this.colorPicker.hue = hue
        }
    }
}
</script>
