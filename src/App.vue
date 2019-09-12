<template>
    <div :class="$style.app">
        <tool-box>
            <div
                :class="strokeColorBubbleClasses"
                :style="strokeColorStyle"
                class="rounded-full m-2"
                @click="switchColor('stroke')"
            />
            <div
                :class="fillColorBubbleClasses"
                :style="fillColorStyle"
                class="rounded-full m-2"
                @click="switchColor('fill')"
            />
        </tool-box>
        <Whiteboard
            :stroke-width="strokeWidth"
            :stroke-color="strokeColor"
            :fill-color="fillColor"
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

    .colorBubble {
        width: 3vmax;
        height: 3vmax;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .colorBubble.empty {
        border: 1px solid #CCC;
    }
</style>

<script>
import Whiteboard from './components/Whiteboard'
import ToolBox from './components/ToolBox'

export default {
    components: {
        Whiteboard,
        ToolBox
    },

    data () {
        return {
            strokeWidth: 4,
            strokeColor: 'black',
            fillColor: undefined,
            colors: [
                '#C0C0C0',
                '#808080',
                '#000000',
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
                '#800080',
                undefined
            ]
        }
    },

    computed: {
        strokeColorBubbleClasses () {
            return {
                [this.$style.colorBubble]: true,
                [this.$style.empty]: !this.strokeColor
            }
        },

        fillColorBubbleClasses () {
            return {
                [this.$style.colorBubble]: true,
                [this.$style.empty]: !this.fillColor
            }
        },

        strokeColorStyle () {
            if (this.strokeColor) {
                return {
                    border: `0.5vmax solid ${this.strokeColor}`
                }
            }
            return {}
        },

        fillColorStyle () {
            if (this.fillColor) {
                return {
                    backgroundColor: this.fillColor
                }
            }
            return {}
        }
    },

    methods: {
        switchColor (type) {
            let newColor = this.colors[Math.floor((Math.random() * this.colors.length))]
            switch (type) {
                case 'stroke':
                    this.strokeColor = newColor
                    break

                case 'fill':
                    this.fillColor = newColor
                    break
            }
        }
    }
}
</script>
