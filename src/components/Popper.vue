<template>
    <div>
        <slot />
    </div>
</template>

<script>
import Popper from 'popper.js'

export default {
    props: {
        reference: {
            type: Node,
            required: true
        },

        placement: {
            type: String,
            default: 'right-start'
        }
    },

    mounted () {
        this.popper = new Popper(this.reference, this.$el, {
            placement: this.placement,
            modifiers: {
                preventOverflow: {
                    enabled: true,
                    boundariesElement: 'viewport'
                }
            }
        })
    },

    beforeDestroy () {
        if (this.popper) {
            this.popper.destroy()
        }
    }
}
</script>
