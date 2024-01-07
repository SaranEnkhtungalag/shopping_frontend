<template>
  {{items}}
  <div>
    <label>Item</label>: <input type="text" id="txt1" v-model="items.name"> />
  </div>
  <div>

  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  data() {
    return {
      items: {}
    };
  },
  mounted() {
    axios
        .get('http://localhost:8080/items')
        .then((response) => {
          this.items = response.data;
        });
  }
};
</script>

<style lang="css" scoped>
*{
  margin: 0;
  padding: 0;
}
.background-image{
  background-image: url("public/shop.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
