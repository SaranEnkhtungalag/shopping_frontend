<template>
  <h1>Shopping List erstellen</h1>
  <!--    Item erstellen    -->
  <NewItemForm />
  <CategoryDetail />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import NewItemForm from '../components/shoppingList/NewItemForm.vue'
import CategoryDetail from '../components/shoppingList/CategoryDetail.vue'

const categories = ref<any[]>([]);

const fetchCategories = () => {
  axios.get('http://localhost:8080/categories')
    .then((response) => {
      categories.value = response.data;
    });
};

const createItem = () => {
  console.log('create item duuddagdlaa')
}

onMounted(() => {
  fetchCategories();
})
// const getCategoryName = (categoryId) => {

//   const category = categories.value.find((c) => c.categoryID === categoryId);
//   return category ? category.categoryName : 'Unknown Category';
//   // if (item && item.categoryID !== undefined) {
//   //   return 'Unknown Category';
//   // } else {
//   //   return 'Category ID is undefined';
//   // }
// };

</script>

<style lang="css" scoped>
</style>
