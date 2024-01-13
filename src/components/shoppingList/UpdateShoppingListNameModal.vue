<template>
    <button type="button" class="btn btn-link" @click="open = true">update name</button>

    <Teleport to="body">
        <div v-if="open" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="shopping-list-name" class="form-label">Shopping list name</label>
                            <input type="text" class="form-control" id="shopping-list-name" v-model="shoppingListName">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="open = false">Close</button>
                        <button type="button" class="btn btn-primary" @click="update">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['update'])

const open = ref(false)
const shoppingListName = ref('')

const update = () => {
    props.update(shoppingListName.value)
    open.value = false
    shoppingListName.value = ''
}
</script>