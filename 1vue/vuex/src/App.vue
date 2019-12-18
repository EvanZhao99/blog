<template>
  <div id="app">
    hello world
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  mounted() {
    console.log(this.$store)
  }
}
</script>
