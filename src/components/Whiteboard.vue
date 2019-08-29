<template>
    <canvas
        :class="$style.container"
        data-paper-resize
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
    />
</template>

<style module>
    .container {
        width: 100%;
        height: 100%;
        touch-action: none;
    }
</style>

<script>
import paper from 'paper'

export default {
    data () {
        return {
            path: '',
            width: 3,
            color: '#000',
            fill: 'none'
        }
    },

    mounted () {
        paper.setup(this.$el)
    },

    methods: {
        onTouchStart (evt) {
            evt.preventDefault()
            return this.onMouseDown(evt, true)
        },

        onTouchMove (evt) {
            return this.onMouseMove(evt, true)
        },

        onTouchEnd (evt) {
            return this.onMouseUp(evt, true)
        },

        onMouseDown (evt, isTouch) {
            let x = isTouch ? evt.touches[0].clientX : evt.clientX
            let y = isTouch ? evt.touches[0].clientY : evt.clientY

            this.path = new paper.Path()
            this.path.strokeColor = '#F00'
            this.path.strokeWidth = 3
            this.path.moveTo(paper.view.viewToProject(new paper.Point(x, y)))

            if (isTouch) {
                this.$el.addEventListener('touchmove', this.onTouchMove)
            } else {
                this.$el.addEventListener('mousemove', this.onMouseMove)
            }
        },

        onMouseMove (evt, isTouch) {
            let x = isTouch ? evt.touches[0].clientX : evt.clientX
            let y = isTouch ? evt.touches[0].clientY : evt.clientY

            this.path.lineTo(paper.view.viewToProject(new paper.Point(x, y)))
        },

        onMouseUp (evt, isTouch) {
            this.path.strokeColor = '#000'
            this.path.simplify()

            if (isTouch) {
                this.$el.removeEventListener('touchmove', this.onTouchMove)
            } else {
                this.$el.removeEventListener('mousemove', this.onMouseMove)
            }
        }
    }
}
</script>
