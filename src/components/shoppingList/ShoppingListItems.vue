<template>
  <div class="item-list mt-5">
    <table class="shopping-list-table table table-success">
      <tbody>
        <template v-for="category in categorizedItemList" :key="category.categoryID">
          <tr class="category-name">
            <td colspan="4">{{ category.categoryName }}</td>
          </tr>

          <tr v-for="item in category.items" :key="item.itemID" class="item">
            <td>{{ item.itemName }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <input type="checkbox" v-model="item.done">
            </td>
            <td>
              <button type="button" class="btn btn-danger btn-sm" @click="() => props.deleteItem(item.itemID)">delete</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, ref, onMounted } from "vue";
import { categorizeItemList } from "../../utils/categorizeItemList"

const props = defineProps(['shoppingList', 'deleteItem'])

const categorizedItemList = computed(() => categorizeItemList(props.shoppingList.items || []))
</script>

<style scoped>
.shopping-list-table {
  margin-left: 2rem;
}
.category-name {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>