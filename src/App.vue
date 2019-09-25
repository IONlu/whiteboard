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
            </tool-box>
        </draggable>
        <popper
            v-if="showPrimaryColorPalette"
            :reference="$refs.primaryColorBubble.$el"
            @close="closePrimaryColorPalette"
        >
            <color-palette
                :colors="colors"
                @select="onPrimaryColorSelect"
            />
        </popper>
        <popper
            v-if="showSecondaryColorPalette"
            :reference="$refs.secondaryColorBubble.$el"
            @close="closeSecondaryColorPalette"
        >
            <color-palette
                :colors="colors"
                @select="onSecondaryColorSelect"
            />
        </popper>
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
                '#FFFFFF',
                '#000000',
                '#F44336',
                '#E91E63',
                '#9C27B0',
                '#673AB7',
                '#3F51B5',
                '#2196F3',
                '#03A9F4',
                '#00BCD4',
                '#009688',
                '#4CAF50',
                '#8BC34A',
                '#CDDC39',
                '#FFEB3B',
                '#FFC107',
                '#FF9800',
                '#FF5722',
                '#795548',
                '#9E9E9E',
                '#607D8B'
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
        },

        closePrimaryColorPalette () {
            this.showPrimaryColorPalette = false
        },

        closeSecondaryColorPalette () {
            this.showSecondaryColorPalette = false
        }
    }
}
</script>
