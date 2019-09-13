<template>
    <div :class="$style.app">
        <tool-box>
            <color-bubble
                :color="primaryColor"
                class="mt-3 first:mt-0"
                @click.native="switchColor('primary')"
            />
            <color-bubble
                :color="secondaryColor"
                class="mt-3 first:mt-0"
                @click.native="switchColor('secondary')"
            />
        </tool-box>
        <Whiteboard
            :stroke-width="strokeWidth"
            :stroke-color="primaryColor"
            :fill-color="secondaryColor"
        />
    </div>
</template>

<style module>
    html,
    body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
    }

    .app {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .color:before {
        content: '×'
    }
</style>

<script>
import Whiteboard from './components/Whiteboard'
import ToolBox from './components/ToolBox'
import ColorBubble from './components/ColorBubble'

export default {
    components: {
        Whiteboard,
        ToolBox,
        ColorBubble
    },

    data () {
        return {
            strokeWidth: 4,
            primaryColorIndex: 1,
            secondaryColorIndex: 0,
            colors: [
                undefined,
                '#000000',
                '#808080',
                '#C0C0C0',
                '#FF0000',
                '#800000',
                '#FFFF00',
                '#808000',
                '#00FF00',
                '#008000',
                '#00FFFF',
                '#008080',
                '#0000FF',
                '#000080',
                '#FF00FF',
                '#800080'
            ]
        }
    },

    computed: {
        primaryColor () {
            return this.colors[this.primaryColorIndex]
        },

        secondaryColor () {
            return this.colors[this.secondaryColorIndex]
        }
    },

    methods: {
        switchColor (type) {
            this[`${type}ColorIndex`]++
            if (this[`${type}ColorIndex`] >= this.colors.length) {
                this[`${type}ColorIndex`] = 0
            }
        }
    }
}
</script>
