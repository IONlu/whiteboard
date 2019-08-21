<template>
    <div
        :class="$style.container"
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
import { SVG } from '@svgdotjs/svg.js'
export default {
    mounted () {
        this.whiteboard = SVG().size('100%', '100%')
        this.$el.appendChild(this.whiteboard.node)
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
            this.pathData = [[ 'M', x, y ]]
            this.points = [[ x, y, Date.now() ]]
            this.currentPath = this.whiteboard
                .path(this.pathData)
                .stroke({ width: 3, color: '#f0e' })
                .fill('none')

            if (isTouch) {
                this.$el.addEventListener('touchmove', this.onTouchMove)
            } else {
                this.$el.addEventListener('mousemove', this.onMouseMove)
            }
        },

        onMouseMove (evt, isTouch) {
            let x = isTouch ? evt.touches[0].clientX : evt.clientX
            let y = isTouch ? evt.touches[0].clientY : evt.clientY
            this.pathData.push([ 'L', x, y ])
            this.points.push([ x, y, Date.now() ])
            this.currentPath.plot(this.pathData)
        },

        onMouseUp (evt, isTouch) {
            this.currentPath
                .plot(this.getSvgPath(this.points, this.getBezierCommand))
                .stroke({ width: 3, color: '#000' })

            if (isTouch) {
                this.$el.removeEventListener('touchmove', this.onTouchMove)
            } else {
                this.$el.removeEventListener('mousemove', this.onMouseMove)
            }
        },

        // source: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
        // Render the svg <path> element
        // I:  - points (array): points coordinates
        //     - command (function)
        //       I:  - point (array) [x,y]: current point coordinates
        //           - i (integer): index of 'point' in the array 'a'
        //           - a (array): complete array of points coordinates
        //       O:  - (string) a svg path command
        // O:  - (string): a Svg <path> element
        getSvgPath (points, command) {
            // build the d attributes by looping over the points
            return points.reduce((acc, point, i, a) => {
                return i === 0
                    ? `M ${point[0]},${point[1]}`
                    : `${acc} ${command(point, i, a)}`
            }, '')
        },

        // source: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
        // Svg path line command
        // I:  - point (array) [x, y]: coordinates
        // O:  - (string) 'L x,y': svg line command
        getLineCommand (point) {
            return `L ${point[0]} ${point[1]}`
        },

        // source: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
        // Properties of a line
        // I:  - pointA (array) [x,y]: coordinates
        //     - pointB (array) [x,y]: coordinates
        // O:  - (object) { length: l, angle: a }: properties of the line
        getLine (pointA, pointB) {
            const lengthX = pointB[0] - pointA[0]
            const lengthY = pointB[1] - pointA[1]

            return {
                length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
                angle: Math.atan2(lengthY, lengthX)
            }
        },

        // source: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
        // Position of a control point
        // I:  - current (array) [x, y]: current point coordinates
        //     - previous (array) [x, y]: previous point coordinates
        //     - next (array) [x, y]: next point coordinates
        //     - reverse (boolean, optional): sets the direction
        // O:  - (array) [x,y]: a tuple of coordinates
        getControlPoint (current, previous, next, reverse) {
            // When 'current' is the first or last point of the array
            // 'previous' or 'next' don't exist.
            // Replace with 'current'
            const p = previous || current
            const n = next || current

            // The smoothing ratio
            const smoothing = 0.2

            // Properties of the opposed-line
            const o = this.getLine(p, n)

            // If is end-control-point, add PI to the angle to go backward
            const angle = o.angle + (reverse ? Math.PI : 0)
            const length = o.length * smoothing

            // The control point position is relative to the current point
            const x = current[0] + Math.cos(angle) * length
            const y = current[1] + Math.sin(angle) * length

            return [x, y]
        },

        // source: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
        // Create the bezier curve command
        // I:  - point (array) [x,y]: current point coordinates
        //     - i (integer): index of 'point' in the array 'a'
        //     - a (array): complete array of points coordinates
        // O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
        getBezierCommand (point, i, a) {
            // start control point
            const [cpsX, cpsY] = this.getControlPoint(a[i - 1], a[i - 2], point)

            // end control point
            const [cpeX, cpeY] = this.getControlPoint(point, a[i - 1], a[i + 1], true)

            return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
        }
    }
}
</script>
