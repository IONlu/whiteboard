<template>
    <div
        :style="containerStyle"
        class="bg-white border-gray-300 border-solid border rounded-lg m-2 absolute"
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
                x: 0,
                y: 0
            }
        }
    },

    computed: {
        containerStyle () {
            return {
                transform: `translate(${this.position.x}px, ${this.position.y}px)`
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
