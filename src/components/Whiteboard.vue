<template>
    <div
        :class="$style.container"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
    />
</template>

<style module>
    .container {
        width: 100%;
        height: 100%;
    }
</style>

<script>
import { SVG } from '@svgdotjs/svg.js'
export default {
    mounted () {
        this.whiteboard = SVG().size('100%', '100%')
        this.$el.appendChild(this.whiteboard.node)
    },

    methods: {
        onMouseDown (evt) {
            this.points = [[ 'M', evt.x, evt.y ]]
            this.currentPath = this.whiteboard
                .path(this.points)
                .stroke({ width: 3, color: '#f0e' })
                .fill('none')

            this.$el.addEventListener('mousemove', this.onMouseMove)
        },

        onMouseMove (evt) {
            this.points.push([ 'L', evt.x, evt.y ])
            this.currentPath.plot(this.points)
        },

        onMouseUp () {
            this.currentPath.stroke({ width: 3, color: '#000' })
            this.$el.removeEventListener('mousemove', this.onMouseMove)
        }
    }
}
</script>
