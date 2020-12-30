<template>
  <div id="app">
    <div>
      state-a: {{$store.state.a}}
      <button @click="$store.commit('add1')">+1</button>
    </div>
    <div>
      state-b: {{$store.state.b}}
    </div>
    <div>
      state-module1-s1: {{$store.state.module1.s1}}
      <button @click="$store.commit('add1')">+1</button>
    </div>
    <div>state详情：{{$store.state}}</div>
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
