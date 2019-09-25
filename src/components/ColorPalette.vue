<template>
    <tool-box
        :columns="columns"
    >
        <template v-for="(colorGroup, index) in colors">
            <color-bubble
                v-for="color in colorGroup"
                :key="index+'-'+color"
                :color="color"
                @click="onClick(color)"
            />
            <hr :style="fullRowStyle" />
        </template>
        <div
            :class="$style.colorPickerContainer"
            :style="fullRowStyle"
        >
            <color-picker
                v-bind="colorPicker"
                @input="onColorPickerInput"
                @change="onColorPickerChange"
            />
        </div>
    </tool-box>
</template>

<style module>
.colorPickerContainer {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

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
                saturation: 90,
                luminosity: 50,
                alpha: 1
            }
        }
    },

    computed: {
        fullRowStyle () {
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
