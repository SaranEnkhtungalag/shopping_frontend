<template>
  <!--    Item erstellen    -->
  <div>
    <div>
      <span class="category-name">{{ activeShoppingList?.shoppingName }}</span>
      <UpdateShoppingListNameModal :update="updateShoppingListName" />
    </div>
    <div class="category-deadline">Deadline: {{ activeShoppingList?.deadline }}</div>

    <div class="shopping-list-content">
      <div>
        <NewItemForm :categories="categories" :createItem="createItem" :addCategory="addCategory" />
      </div>
      <div>
        <ShoppingListItems :shoppingList="activeShoppingList" :deleteItem="deleteItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import axios from "axios";
import NewItemForm from '../components/shoppingList/NewItemForm.vue'
import ShoppingListItems from '../components/shoppingList/ShoppingListItems.vue'
import UpdateShoppingListNameModal from '../components/shoppingList/UpdateShoppingListNameModal.vue'

const categories = ref([]);
const shoppingLists = ref([]);

const activeShoppingList = computed(() => {
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

const createItem = (body) => {
  axios
    .post('http://localhost:8080/items', body)
    .then((response) => {
      if (response.status === 200) {
        fetchShoppingLists();
      }
    });
}

const deleteItem = (id) => {
  axios
    .delete(`http://localhost:8080/items/${id}`)
    .then((response) => {
      if (response.status === 200) {
        fetchShoppingLists();
      }
    });
}

const addCategory = (name) => {
  axios
    .post(`http://localhost:8080/categories`, { categoryName: name })
    .then((response) => {
      if (response.status === 200) {
        fetchCategories();
      }
    });
}

const updateShoppingListName = (name) => {
  axios
    .put(`http://localhost:8080/shoppingLists/${activeShoppingList.value.idShoppingList}`, { shoppingName: name })
    .then((response) => {
      if (response.status === 200) {
        fetchShoppingLists();
      }
    });
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
