<template>
  <div>
    <h1>Item View</h1>
    <ul v-for="shoppingList in shoppingLists" :key="shoppingList.idShoppingList">
      <li>{{ shoppingList.shoppingName }}</li>
      <ul>
        <li v-for="item in shoppingList.items" :key="item.itemID">
          {{ item.itemName }} - {{ item.quantity }} - {{ getCategoryName(item.categoryID) }}
        </li>
      </ul>
    </ul>
<!--    <div v-if="createdItem">-->
<!--      <h2>Neu erstelltes Item:</h2>-->
<!--      <p>Name: {{ createdItem.itemName }}</p>-->
<!--      <p>Menge: {{ createdItem.quantity }}</p>-->
<!--      <p>Kategorie: {{ getCategoryName(createdItem.categoryID) }}</p>-->
<!--      <p>Shopping List ID: {{ createdItem.idShoppingList.idShoppingList }}</p>-->
<!--    </div>-->
<!--    <div>-->
<!--      <h2>Neues Item erstellen</h2>-->
<!--      <label>Item Name:</label>-->
<!--      <input type="number" v-model="newItemQuantity" />-->
<!--      <label>Kategorie:</label>-->
<!--      <select v-model="selectedCategory">-->
<!--        <option v-for="category in categories" :key="category.categoryID" :value="category.categoryID">-->
<!--          {{ category.categoryName }}-->
<!--        </option>-->
<!--      </select>-->
<!--      <label>Shopping List ID:</label>-->
<!--      <input type="number" v-model="newItemShoppingListID" />-->
<!--      <button @click="createItem">Item erstellen</button>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div>-->
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const { shoppingLists, categories } = defineProps(['shoppingLists', 'categories']);
const getCategoryName = (categoryId) => {
  const category = categories.find((c) => c.categoryID === categoryId);
  return category ? category.categoryName : 'Unbekannte Kategories';
};

/*
import { ref } from 'vue';
import axios from "axios";

const createdItem = ref(null);
const newItemName = ref('');
const newItemQuantity = ref(1);
const newItemShoppingListID = ref([]);
const selectedCategory = ref(null)
const categories = ref('');

const fetchCategories = () => {
    axios
        .get('http://localhost:8080/categories')
        .then((response) => {
          categories.value = response.data;
        });
  };
const createItem = () => {
  const newItemData = {
    itemName: newItemName.value,
    quantity: newItemQuantity.value,
    idShoppingList: {
      idShoppingList: newItemShoppingListID.value
    },
    categoryID: selectedCategory.value
  };
  axios
    .post("http://localhost:8080/items", newItemData)
    .then((response) => {
      createdItem.value = response.data;
    })
    .catch((error) => {
      console.error("Error creating item:", error);
    });
 };
/*
const getCategoryName = (categoryId) => {
  const category = categories.value.find((c) => c.categoryID === categoryId);
  return category ? category.categoryName : "Unknown";
};

fetchCategories();
*/
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
