<template>
    <div
        :style="styles"
        class="absolute"
    >
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

    data () {
        return {
            styles: {}
        }
    },

    created () {
        this.outsideClickOptions = {
            capture: true,
            passive: true
        }
        window.addEventListener('mousedown', this.handleOutsideClick, this.outsideClickOptions)
        window.addEventListener('touchstart', this.handleOutsideClick, this.outsideClickOptions)
    },

    mounted () {
        this.popper = new Popper(this.reference, this.$el, {
            placement: this.placement,
            modifiers: {
                preventOverflow: {
                    enabled: true,
                    boundariesElement: 'viewport'
                },
                applyStyle: {
                    enabled: false
                },
                applyVueStyle: {
                    enabled: true,
                    fn: this.handlePopperUpdate,
                    order: 900
                }
            }
        })
    },

    beforeDestroy () {
        window.removeEventListener('mousedown', this.handleOutsideClick, this.outsideClickOptions)
        window.removeEventListener('touchstart', this.handleOutsideClick, this.outsideClickOptions)
        if (this.popper) {
            this.popper.destroy()
        }
    },

    methods: {
        handleOutsideClick (evt) {
            if (!this.$el.contains(evt.target)) {
                this.$emit('close')
            }
        },

        handlePopperUpdate (data) {
            this.styles = data.styles
        }
    }
}
</script>
