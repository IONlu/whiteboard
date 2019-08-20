<template>
    <div :class="$style.app">
        <Whiteboard />
    </div>
</template>

<style module>
    html,
    body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
    }

    .app {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>

<script>
import Whiteboard from './components/Whiteboard.vue'

export default {
    components: {
        Whiteboard
    }
}
</script>
