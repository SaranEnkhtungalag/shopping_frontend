<template>
    <button type="button" class="btn btn-link" @click="open = true">add category</button>

    <div v-if="open" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="category-mame" class="form-label">Category name</label>
                        <input type="text" class="form-control" id="category-mame" v-model="categoryName">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="open = false">Close</button>
                    <button type="button" class="btn btn-primary" @click="addCategory">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['addCategory'])

const open = ref(false)
const categoryName = ref('')

const addCategory = () => {
    props.addCategory(categoryName.value)
    open.value = false
    categoryName.value = ''
}
</script>