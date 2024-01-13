<template>
    <input type="checkbox" v-model="itemDone">
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
const storageKey = 'ITEM_DONE_MAP'
const props = defineProps(['itemID'])

const itemDone = ref(false)
watch(itemDone, () => {
    try {
        const ITEM_DONE_MAP = JSON.parse(localStorage.getItem(storageKey)) || {}
        ITEM_DONE_MAP[props.itemID] = itemDone.value
        localStorage.setItem(storageKey, JSON.stringify(ITEM_DONE_MAP))
    } catch(e) {
        console.error(e)
    }
})

onMounted(() => {
    const ITEM_DONE_MAP = JSON.parse(localStorage.getItem(storageKey)) || {}
    itemDone.value = ITEM_DONE_MAP[props.itemID] || false
})
</script>