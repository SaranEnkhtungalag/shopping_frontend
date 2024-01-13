<template>
    <div class="new-item-form mt-3">
        <h5>What did you buy?</h5>
        <div class="mb-3">
            <label for="itemName" class="form-label">Name</label>
            <input type="text" class="form-control" id="itemName" v-model="newItemName">
        </div>
        <div class="mb-3">
            <label for="itemQuantity" class="form-label">Quantity</label>
            <input type="number" class="form-control" id="itemQuantity" v-model="newItemQuantity">
        </div>
        <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <select class="form-select" aria-label="Category" id="category" v-model="newItemCategory">
                <option selected>Please select the category</option>
                <option v-for="category in props.categories" :key="category.categoryID" :value="category.categoryID">
                    {{ category.categoryName }}
                </option>
            </select>
            <a class="add-category" href="#" @click="addNewCategory">add category</a>
        </div>
        <button type="button" class="btn btn-primary mb-4" @click="createItem">Create item</button>
        <div class="background-image"></div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const props = defineProps(['categories', 'createItem'])
const newItemName = ref('');
const newItemQuantity = ref(1);
const newItemCategory = ref<number | null>(null);
    
const createItem = () => {
    const body = {
        itemName: newItemName.value,
        quantity: newItemQuantity.value,
        categoryID: newItemCategory.value,
    }

    props.createItem(body)
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