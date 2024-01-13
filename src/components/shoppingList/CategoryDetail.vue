<template>
  <div class="category-detail">
    <div class="category-name">Shopping list name: {{ activeShoppingList?.shoppingName }}<a class="link-opacity-100-hover"
        href="#" @click="updateShoppingListName">update name</a></div>
    <div class="category-deadline">Deadline: {{ activeShoppingList?.deadline }}</div>
  </div>
  <div class="item-list">
    <!-- category davtalt -->
    <div v-for="category in categorizedItemList" :key="category.categoryID" class="category-name">
      {{ category.categoryName }}
      
      <!-- item davtalt -->
      <div v-for="item in category.items" :key="item.itemID" class="item">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-quantity">{{ item.quantity }}</span>
        <span class="item-done">{{ item.done }}</span>
        <button class="item-delete" @click="deleteItem">delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, ref, onMounted } from "vue";
import { categorizeItemList } from "../../utils/categorizeItemList"

const shoppingLists = ref([]);
const activeShoppingList = computed(() => {
  return shoppingLists.value[0]
})

const categorizedItemList = computed(() => categorizeItemList(shoppingLists.value[0]?.items || []))

const updateShoppingListName = () => {
  console.log('update shopping list name')
}
const deleteItem = () => {
  console.log('delete item')
}

const fetchShoppingLists = () => {
  axios
    .get('http://localhost:8080/shoppingLists')
    .then((response) => {
      shoppingLists.value = response.data;
    });
};

onMounted(() => {
  fetchShoppingLists();
})
</script>