<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <navbar/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <BreadCrumb/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-view/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navbar from './components/Navbar.vue'
import BreadCrumb from './components/BreadCrumb.vue'

export default {
  name: 'app',
  components: {
    Navbar, BreadCrumb
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: "world",
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}


a {
  color: #42b983;
}
</style>
