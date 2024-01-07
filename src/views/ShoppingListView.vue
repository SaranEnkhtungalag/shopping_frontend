<template>
  {{shoppingLists}}
  <div>
    <label>Shopping Name</label>: <input type="text" id="txt1" v-model="shoppingLists.name"> />
  </div>
  <div>

  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  data() {
    return {
      shoppingLists: {}
    };
  },
  mounted() {
    axios
      .get('http://localhost:8080/shoppingLists')
      .then((response) => {
        this.shoppingLists = response.data;
      });
  }
};
</script>



<!--<template>-->
<!--  <h1>Welcome to ShoppingList</h1>-->
<!--  <div class="container-fluid">-->
<!--    <div class="col" v-for="shoppingList in shoppingLists" :key="shoppingList.id"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--export default {-->
<!--  name: 'ShoppingListView',-->
<!--  data() {-->
<!--    return {-->
<!--      shoppingLists:[]-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    const endpoint = import.meta.env.VITE_BACKEND_BASE_URL + '/shoppingLists'-->
<!--    const requistOptions = {-->
<!--      method: 'GET',-->
<!--      redirect: 'follow'-->
<!--    }-->
<!--    fetch(endpoint, requistOptions).then(response => response.json()).then(result => console.log(result)).catch(error => console.log('error', error))-->
<!--  }-->
<!--}-->
<!--</script>-->


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
