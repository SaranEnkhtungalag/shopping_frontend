<template>
  <div class="new-item-form">
    <h2>Was kaufen Sie noch?</h2>
    <div>
      <label>Item Name:</label>
      <input type="text" v-model="newItemName">
    </div>
    <div>
      <label>Quantity:</label>
      <input type="number" v-model="newItemQuantity" />
    </div>
    <label>Kategorie:</label>
    <select v-model="newItemCategory">
      <option v-for="category in props.categories" :key="category.categoryID" :value="category.categoryID">
        {{ category.categoryName }}
      </option>
    </select>
    <button @click="createItem">Item erstellen</button>
    <div class="background-image"></div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const props = defineProps(['categories'])
const newItemName = ref('');
const newItemQuantity = ref(1);
const newItemCategory = ref<number|null>(null);

const createItem = () => {
    console.log('create item')
}
</script>

<style scoped>
.background-image {
  background-image: url("/public/shop3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 75vh;
}
</style>