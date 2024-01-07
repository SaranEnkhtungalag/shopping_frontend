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

<template>
  <div class="home">
    <div class="w-100 d-flex justify-content-center align-items-center" style=" height: 100vh; width: 100vw; background-size: contain; display: flex; background-image: url('public/shop.jpg')">
      <HelloWorld msg="Herzlich willkommen auf der Webseite unsere Shopping List!"/>
    </div>
  </div>
<!--  <div id='Home' class="w-100 d-flex justify-content-center align-items-center" style="height: 100vh; background-image: url('../assets/shop.jpg')">-->
<!--    <HelloWorld msg="Herzlich willkommen auf der Webseite unsere Shopping List!"/>-->
<!--  </div>-->
</template>
