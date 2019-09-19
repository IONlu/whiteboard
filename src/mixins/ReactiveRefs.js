import Vue from 'vue'

// based on https://github.com/posva/vue-reactive-refs/blob/ea0375621eb6f383f69bf564572fdd10841cc49e/src/proxy.ts#L10
export default () => {
    return {
        beforeCreate () {
            const $refs = Vue.observable({})
            this.$refs = new Proxy($refs, {
                set (target, key, value) {
                    if (!(key in target)) Vue.set($refs, key, value)
                    return Reflect.set(target, key, value)
                },
                get (target, key) {
                    if (!(key in target)) Vue.set($refs, key, undefined)
                    return Reflect.get(target, key)
                }
            })
        }
    }
}
