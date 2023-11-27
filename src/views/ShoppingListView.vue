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

<template>
  {{shoppingLists}}
</template>


<style scoped>

</style>
