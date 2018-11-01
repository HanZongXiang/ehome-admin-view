<template>
  <div class="index-wrap">
    <!-- <vue-particles
      color="#6495ED"
      :particleOpacity="0.8"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#6495ED"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.6"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles> -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

export default {
  name:'',
  data() {
    return {

    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped>
#particles-js {
  position: absolute;
  top: 51px;
  left: 254px;
  z-index: 98;
  width: 100%;
  height: 99%;
}
</style>
