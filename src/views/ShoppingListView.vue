<template>
  <h1>Shopping List erstellen</h1>
  <div>
    <h3>List:</h3>
<!--    Item erstellen    -->
  </div>
    <div class="item-form">
      <h2>Was kaufen Sie noch?</h2>
      <label>Item Name:</label>
      <input type="text" v-model="newItemName">
      <label>Quantity:</label>
      <input type="number" v-model="newItemQuantity" />
      <label>Kategorie:</label>
      <select v-model="selectedCategory">
        <option v-for="category in categories" :key="category.categoryID" :value="category.categoryID">
          {{ category.categoryName }}
        </option>
      </select>
      <button @click="createItem">Item erstellen</button>
    </div>
  <!--  vorhandener Einkaufslisten  -->
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Done</th>
        <th>Deadline</th>
        <th>Items</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="shoppingList in shoppingLists" :key="shoppingList.idShoppingList">
        <td>{{ shoppingList.idShoppingList }}</td>
        <td>{{ shoppingList.shoppingName ? shoppingList.shoppingName : 'Unnamed Shopping List' }}</td>
        <td>{{ shoppingList.done ? 'Yes' : 'No' }}</td>
        <td>{{ shoppingList.deadline }}</td>
        <td>
          <ul>
            <li v-for="item in shoppingList.items" :key="item.itemID">
              {{ item.itemName }} - {{ item.quantity }} - {{ getCategoryName(item.categoryID) }} - {{ item.done ? 'Done' : 'Not Done'}}
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-for="list in shoppingLists" :key="list.id">
    <h2>{{list.name }}</h2>
    <u>
      <li v-for="item in list.items" :key="item.id">
        {{ item.name }} - {{ item.quantity }}
      </li>
    </u>
  </div>
  <div v-if="selectedList">
    <h3>Neues Element zur Liste hinzufügen</h3>
    <label>Artikelname:</label>
    <input type="text" v-model="newItemName" />
    <label>Menge:</label>
    <input type="number" v-model="newItemQuantity" />
    <button @click="addItemToList">Element hinzufügen</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ItemView from "../components/ItemView.vue";

const shoppingLists= ref([]);
const newListName = ref('');
const newItemName = ref('');
const newItemQuantity = ref(1);
const selectedCategory = ref(null);
const categories = ref([]);

const fetchShoppingLists = () => {
  axios
      .get('http://localhost:8080/shoppingLists')
      .then((response) => {
        shoppingLists.value = response.data;
      });
};

const fetchCategories = () => {
  axios.get('http://localhost:8080/categories')
    .then((response) => {
      categories.value = response.data;
  });
};

const addShoppingList = () => {
  if (newListName.value.trim() !== '') {
    const newShoppingList = {
      shoppingName: newListName.value,
    }
  }
}

const getCategoryName = (categoryId) => {
  return "unknown";
};

onMounted(() => {
  fetchShoppingLists();
})
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
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

</style>
