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
        style () {
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
    },

    render () {
        return this.$scopedSlots.default({
            style: this.style
        })
    }
}
</script>
