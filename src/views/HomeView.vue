<template>
  <div class="home-container">
    <HelloWorld msg="Welcome to Shopping List!" />
    <div class="background-container">
    </div>
  </div>
  <!-- <div class="w-100 d-flex justify-content-center align-items-center" style=" height: 100vh; width: 100vw; background-size: contain; display: flex; background-image: url('public/shop.jpg')">-->
  <!--  <div id='Home' class="w-100 d-flex justify-content-center align-items-center" style="height: 100vh; background-image: url('../assets/shop.jpg')">-->
  <!--    <HelloWorld msg="Herzlich willkommen auf der Webseite unsere Shopping List!"/>-->
  <!--  </div>-->
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
<style scoped>
.home-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;
}

.background-container {
  background-image: url('/public/shop2.png');
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-button {
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%);
  margin-top: 100px;
}
</style>
