<template>
  <div class="item-list">
    <table class="shopping-list-table">
      <template v-for="category in categorizedItemList" :key="category.categoryID">
        <tr class="category-name">
          <td colspan="4"><h2>{{ category.categoryName }}</h2></td>
        </tr>

        <tr v-for="item in category.items" :key="item.itemID" class="item">
          <td><span class="item-name">{{ item.itemName }}</span></td>
          <td><span class="item-quantity">{{ item.quantity }}</span></td>
          <td><span class="item-done">{{ item.done }}</span></td>
          <td><button class="item-delete" @click="deleteItem">delete</button></td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, ref, onMounted } from "vue";
import { categorizeItemList } from "../../utils/categorizeItemList"

const props = defineProps(['shoppingList'])

const categorizedItemList = computed(() => categorizeItemList(props.shoppingList.items || []))

const updateShoppingListName = () => {
  console.log('update shopping list name')
}

const deleteItem = () => {
  console.log('delete item')
}


onMounted(() => {
})
</script>