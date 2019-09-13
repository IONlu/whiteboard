<template>
    <div
        :style="containerStyle"
        class="bg-white border-gray-300 border-solid border rounded-lg p-3 absolute"
    >
        <slot />
    </div>
</template>

<script>
import interact from 'interactjs'

export default {
    data () {
        return {
            position: {
                x: 10,
                y: 10
            }
        }
    },

    computed: {
        containerStyle () {
            return {
                transform: `translate3d(${this.position.x}px, ${this.position.y}px, 0)`
            }
        }
    },

    mounted () {
        interact(this.$el)
            .draggable({
                // enable inertial throwing
                inertia: true,

                // keep the element within the area of it's parent
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],

                // enable autoScroll
                autoScroll: false,

                onmove: this.onMove
            })
    },

    methods: {
        onMove (evt) {
            this.position.x += evt.dx
            this.position.y += evt.dy
        }
    }
}
</script>
