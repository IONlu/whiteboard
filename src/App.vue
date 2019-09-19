<template>
    <div :class="$style.app">
        <draggable v-slot="{ style }">
            <tool-box :style="style">
                <color-bubble
                    ref="primaryColorBubble"
                    :color="primaryColor"
                    @click="onPrimaryColorClick"
                />
                <color-bubble
                    ref="secondaryColorBubble"
                    :color="secondaryColor"
                    @click="onSecondaryColorClick"
                />
                <popper
                    v-if="showPrimaryColorPalette"
                    :reference="$refs.primaryColorBubble.$el"
                >
                    <color-palette
                        :colors="colors"
                        @select="onPrimaryColorSelect"
                    />
                </popper>
                <popper
                    v-if="showSecondaryColorPalette"
                    :reference="$refs.secondaryColorBubble.$el"
                >
                    <color-palette
                        :colors="colors"
                        @select="onSecondaryColorSelect"
                    />
                </popper>
            </tool-box>
        </draggable>
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
        overflow: hidden;
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
import ColorPalette from './components/ColorPalette'
import Popper from './components/Popper'
import Draggable from './components/Draggable'
import ReactiveRefs from './mixins/ReactiveRefs'

export default {
    components: {
        Whiteboard,
        ToolBox,
        ColorBubble,
        ColorPalette,
        Popper,
        Draggable
    },

    mixins: [
        ReactiveRefs()
    ],

    data () {
        return {
            showPrimaryColorPalette: false,
            showSecondaryColorPalette: false,
            strokeWidth: 4,
            primaryColor: '#000000',
            secondaryColor: undefined,
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
            ],
            popperOptions: {
                gpuAcceleration: true,
                placement: 'right'
            }
        }
    },

    methods: {
        onPrimaryColorSelect (color) {
            this.primaryColor = color
            this.showPrimaryColorPalette = false
        },

        onSecondaryColorSelect (color) {
            this.secondaryColor = color
            this.showSecondaryColorPalette = false
        },

        onPrimaryColorClick () {
            this.showPrimaryColorPalette = !this.showPrimaryColorPalette
        },

        onSecondaryColorClick () {
            this.showSecondaryColorPalette = !this.showSecondaryColorPalette
        }
    }
}
</script>
