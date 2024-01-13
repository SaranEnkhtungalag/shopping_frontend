<template>
  <!--    Item erstellen    -->
  <div>
    <div>
      <span class="category-name">{{ activeShoppingList?.shoppingName }}</span>
      <a class="update-shopping-list-name" href="#" @click="updateShoppingLstName">update name</a>
    </div>
    <div class="category-deadline">Deadline: {{ activeShoppingList?.deadline }}</div>

    <div class="shopping-list-content">
      <div>
        <NewItemForm :categories="categories" :createItem="createItem" />
      </div>
      <div>
        <ShoppingListItems :shoppingList="activeShoppingList" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import axios from "axios";
import NewItemForm from '../components/shoppingList/NewItemForm.vue'
import ShoppingListItems from '../components/shoppingList/ShoppingListItems.vue'

const categories = ref<any[]>([]);
const shoppingLists = ref([]);

const activeShoppingList = computed<any>(() => {
  return shoppingLists.value[0] || {}
})

const fetchCategories = () => {
  axios.get('http://localhost:8080/categories')
    .then((response) => {
      categories.value = response.data;
    });
};

const fetchShoppingLists = () => {
  axios
    .get('http://localhost:8080/shoppingLists')
    .then((response) => {
      shoppingLists.value = response.data;
    });
};

onMounted(() => {
  fetchCategories();
  fetchShoppingLists();
})

const createItem = (body: any) => {
  axios
    .post('http://localhost:8080/items', body)
    .then((response) => {
      if (response.status === 200) {
        fetchShoppingLists();
      }
    });
}

const updateShoppingLstName = () => {
  console.log('update shopping list name')
}
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
.category-name {
  font-size: 2rem;
}

.update-shopping-list-name {
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.shopping-list-content {
  display: flex;
}

.shopping-list-content>div {
  flex: 1;
}
</style>
