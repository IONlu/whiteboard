<template>
    <div :class="$style.app">
        <div :class="$style.menuContainer">
            <div
                :class="strokeColorBubbleClasses"
                :style="strokeColorStyle"
                @click="switchColor('stroke')"
            />
            <div
                :class="fillColorBubbleClasses"
                :style="fillColorStyle"
                @click="switchColor('fill')"
            />
        </div>
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
        border-radius: 50%;
        width: 3vmax;
        height: 3vmax;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .colorBubble.empty {
        border: 1px solid #CCC;
        border-radius: 50%;
    }

    .menuContainer {
        position: absolute;
        margin: 0.5vmax;
    }

    .menuContainer > *:not(:first-child) {
        margin-top: 0.5vmax;
    }
</style>

<script>
import Whiteboard from './components/Whiteboard.vue'

export default {
    components: {
        Whiteboard
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
