<template>
    <canvas
        :class="$style.container"
        data-paper-resize
        @touchstart="onTouchStart"
        @mousedown="onMouseDown"
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
    props: {
        strokeColor: {
            type: String,
            default: 'black'
        },

        fillColor: {
            type: String,
            default: undefined
        },

        strokeWidth: {
            type: Number,
            default: 4
        }
    },

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
        this.touchMap = new Map()

        // add touch event listeners
        window.addEventListener('touchmove', this.onTouchMove)
        window.addEventListener('touchend', this.onTouchEnd)
        window.addEventListener('touchcancel', this.onTouchEnd)
    },

    beforeDestroy () {
        // remove touch event listeners
        window.removeEventListener('touchmove', this.onTouchMove)
        window.removeEventListener('touchend', this.onTouchEnd)
        window.removeEventListener('touchcancel', this.onTouchEnd)
    },

    methods: {
        onMouseDown (evt) {
            this.start(
                'mouse',
                evt.clientX,
                evt.clientY
            )

            window.addEventListener('mousemove', this.onMouseMove)
            window.addEventListener('mouseup', this.onMouseUp)
        },

        onMouseMove (evt) {
            this.move(
                'mouse',
                evt.clientX,
                evt.clientY
            )
        },

        onMouseUp () {
            this.end('mouse')

            window.removeEventListener('mousemove', this.onMouseMove)
            window.removeEventListener('mouseup', this.onMouseUp)
        },

        onTouchStart (evt) {
            evt.preventDefault()
            for (var i = 0; i < evt.changedTouches.length; i++) {
                this.start(
                    'touch:' + evt.changedTouches[i].identifier,
                    evt.changedTouches[i].clientX,
                    evt.changedTouches[i].clientY
                )
            }
        },

        onTouchMove (evt) {
            for (var i = 0; i < evt.changedTouches.length; i++) {
                this.move(
                    'touch:' + evt.changedTouches[i].identifier,
                    evt.changedTouches[i].clientX,
                    evt.changedTouches[i].clientY
                )
            }
        },

        onTouchEnd (evt) {
            for (var i = 0; i < evt.changedTouches.length; i++) {
                this.end('touch:' + evt.changedTouches[i].identifier)
            }
        },

        start (id, x, y) {
            let targetPoint = paper.view.viewToProject(new paper.Point(x, y))

            let startPath = new paper.Path.Circle(targetPoint, this.strokeWidth / 2)
            startPath.fillColor = this.strokeColor
            let hasMoved = false

            let path = new paper.Path()
            path.strokeColor = this.strokeColor
            path.fillColor = this.fillColor
            path.strokeWidth = this.strokeWidth
            path.strokeCap = 'round'
            path.strokeJoin = 'round'
            path.moveTo(targetPoint)

            this.touchMap.set(id, {
                startPath,
                path,
                hasMoved
            })
        },

        move (id, x, y) {
            let targetPoint = paper.view.viewToProject(new paper.Point(x, y))

            let data = this.touchMap.get(id)
            if (data) {
                data.hasMoved = true
                data.startPath.remove()

                data.path.lineTo(targetPoint)
            }
        },

        end (id) {
            let data = this.touchMap.get(id)
            if (data) {
                if (!data.hasMoved) {
                    data.path.remove()
                } else {
                    data.path.simplify()
                }
                this.touchMap.delete(id)
            }
        }
    }
}
</script>
