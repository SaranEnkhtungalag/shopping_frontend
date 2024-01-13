<template>
  <h1>Shopping List erstellen</h1>
  <div></div>
  <!--    Item erstellen    -->
  <div class="item-form">
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
    <select v-model="selectedCategory">
      <option v-for="category in categories" :key="category.categoryID" :value="category.categoryID">
        {{ category.categoryName }}
      </option>
    </select>
    <button @click="createItem">Item erstellen</button>
    <div class="background-image"></div>
  </div>
  <!--  vorhandene Einkaufslisten  -->
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Done</th>
        <th>Deadline</th>
        <th>Items</th>
        <th>Category</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="shoppingList in shoppingLists" :key="shoppingList.idShoppingList">
        <td>{{ shoppingList.idShoppingList }}</td>
        <td>{{ shoppingList.shoppingName ? shoppingList.shoppingName : 'Unnamed Shopping List' }}</td>
        <td>
          <!-- Done als Checkbox -->
          <input type="checkbox" v-model="shoppingList.done" />
        </td>
        <td>{{ shoppingList.deadline }}</td>
        <td>
          <ul>
            <li v-for="item in shoppingList.items" :key="item.itemID">
              {{ item ? item.itemName : 'Unnamed Item' }} - {{ item ? item.quantity : 'Quantity not available' }} - {{
                getCategoryName(item) }} - {{ item && item.done ? 'Done' : 'Not Done' }}
            </li>
          </ul>
        </td>
        <td>{{ getCategoryName(item) }}</td>
        <td>
          <!-- Delete Button -->
          <button @click="deleteShoppingList(shoppingList.idShoppingList)" class="delete-button">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <div v-if="selectedList">
    <h3>Neues Element zur Liste hinzufügen</h3>
    <label>Artikelname:</label>
    <input type="text" v-model="newItemName" />
    <label>Menge:</label>
    <input type="number" v-model="newItemQuantity" />
    <button @click="addItemToList">Element hinzufügen</button>
  </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
// import ItemView from "../components/ItemView.vue";

const shoppingLists = ref([]);
const newListName = ref('');
const newItemName = ref('');
const newItemQuantity = ref(1);
const selectedCategory = ref(null);
const categories = ref<any[]>([]);

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

// const addShoppingList = () => {
//   if (newListName.value.trim() !== '') {
//     const newShoppingList = {
//       shoppingName: newListName.value,
//     }
//   }
// }

// const deleteShoppingList = (shoppingListId) => {
//   axios.delete(`http://localhost:8080/shoppingLists/${shoppingListId}`)
//     .then(() => {
//       fetchShoppingLists();
//     })
//     .catch((error) => {
//       console.error("Error deleting shopping list:", error);
//     });
// };


const getCategoryName = (categoryId) => {

  const category = categories.value.find((c) => c.categoryID === categoryId);
  return category ? category.categoryName : 'Unknown Category';
  // if (item && item.categoryID !== undefined) {
  //   return 'Unknown Category';
  // } else {
  //   return 'Category ID is undefined';
  // }
};

onMounted(() => {
  fetchShoppingLists();
  fetchCategories();
})
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  background-color: #cdeccd;
}

.background-image {
  background-image: url("/public/shop3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 75vh;
}

table {
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.delete-button {
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
<!--<template>-->
<!--  <div>-->
<!--    <h1>Shopping List</h1>-->
<!--    <div>-->
<!--      <h2>Create new Shopping List: </h2>-->
<!--      <form @submit.prevent="createShoppingList">-->
<!--        <label for="newListName">Name:</label>-->
<!--        <input type="text" id="newListName" v-model="newListName" required />-->
<!--        <label for="newListDeadline">Deadline:</label>-->
<!--        <input type="date" id="newListDeadline" v-model="newListDeadline" required />-->
<!--        <button type="submit">Erstellen</button>-->
<!--      </form>-->
<!--    </div>-->

<!--    &lt;!&ndash; Anzeige der vorhandenen Kategorien &ndash;&gt;-->
<!--    <div>-->
<!--      <h2>Kategorien</h2>-->
<!--      <ul>-->
<!--        <li v-for="category in categories" :key="category.categoryID">-->
<!--          {{ category.categoryName }}-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->

<!--    &lt;!&ndash; Formular zum Hinzufügen eines neuen Artikels &ndash;&gt;-->
<!--    <div>-->
<!--      <h2>Neuen Artikel hinzufügen</h2>-->
<!--      <form @submit.prevent="addItemToShoppingList">-->
<!--        <label for="newItemName">Artikelname:</label>-->
<!--        <input type="text" id="newItemName" v-model="newItemName" required />-->
<!--        <label for="newItemQuantity">Menge:</label>-->
<!--        <input type="number" id="newItemQuantity" v-model="newItemQuantity" required />-->
<!--        <label for="newItemCategory">Kategorie:</label>-->
<!--        <select id="newItemCategory" v-model="newItemCategory" required>-->
<!--          <option v-for="category in categories" :key="category.categoryID" :value="category.categoryID">-->
<!--            {{ category.categoryName }}-->
<!--          </option>-->
<!--        </select>-->
<!--        <label for="newItemShoppingList">Einkaufsliste:</label>-->
<!--        <select id="newItemShoppingList" v-model="selectedShoppingList" required>-->
<!--          <option v-for="shoppingList in shoppingLists" :key="shoppingList.idShoppingList" :value="shoppingList.idShoppingList">-->
<!--            {{ shoppingList.shoppingName ? shoppingList.shoppingName : 'Unnamed Shopping List' }}-->
<!--          </option>-->
<!--        </select>-->
<!--        <button type="submit">Hinzufügen</button>-->
<!--      </form>-->
<!--    </div>-->

<!--    &lt;!&ndash; Tabelle zur Anzeige der vorhandenen Shopping-Liste &ndash;&gt;-->
<!--    <table>-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th>ID</th>-->
<!--        <th>Name</th>-->
<!--        <th>Done</th>-->
<!--        <th>Deadline</th>-->
<!--        <th>Items</th>-->
<!--        <th>Category</th>-->
<!--        <th>Action</th>-->
<!--      </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="shoppingList in shoppingLists" :key="shoppingList.idShoppingList">-->
<!--        <td>{{ shoppingList.idShoppingList }}</td>-->
<!--        <td>{{ shoppingList.shoppingName ? shoppingList.shoppingName : 'Unnamed Shopping List' }}</td>-->
<!--        <td>-->
<!--          <input type="checkbox" v-model="shoppingList.done" />-->
<!--        </td>-->
<!--        <td>{{ shoppingList.deadline }}</td>-->
<!--        <td>-->
<!--          <ul>-->
<!--            <li v-for="item in shoppingList.items" :key="item.itemID">-->
<!--              {{ item ? item.itemName : 'Unnamed Item' }} - -->
<!--              {{ item ? item.quantity : 'Quantity not available' }} - -->
<!--              {{ getCategoryName(item) }} - -->
<!--              {{ item && item.done ? 'Done' : 'Not Done' }}-->
<!--            </li>-->
<!--          </ul>-->
<!--        </td>-->
<!--        <td>{{ getCategoryName(item.categoryID) }}</td>-->
<!--        <td>-->
<!--          <button @click="deleteShoppingList(shoppingList.idShoppingList)">Löschen</button>-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, onMounted } from 'vue';-->
<!--import axios from 'axios';-->

<!--const shoppingLists = ref([]);-->
<!--const categories = ref([]);-->
<!--const newListName = ref('');-->
<!--const newListDeadline = ref('');-->
<!--const newItemName = ref('');-->
<!--const newItemQuantity = ref(0);-->
<!--const newItemCategory = ref('');-->
<!--const selectedShoppingList = ref('');-->

<!--const fetchShoppingLists = () => {-->
<!--  axios-->
<!--      .get('http://localhost:8080/shoppingLists')-->
<!--      .then((response) => {-->
<!--        shoppingLists.value = response.data;-->
<!--      });-->
<!--};-->

<!--const fetchCategories = () => {-->
<!--  axios-->
<!--      .get('http://localhost:8080/categories')-->
<!--      .then((response) => {-->
<!--        categories.value = response.data;-->
<!--      });-->
<!--};-->

<!--const getCategoryName = (categoryId) => {-->
<!--  const category = categories.value.find((c) => c.categoryID === categoryId);-->
<!--  return category ? category.categoryName : 'Unknown Category';-->
<!--};-->

<!--const createShoppingList = () => {-->
<!--  if (newListName.value && newListDeadline) {-->
<!--    // Erstelle ein Objekt mit den Daten der neuen Einkaufsliste-->
<!--    const newShoppingList = {-->
<!--      shoppingName: newListName,-->
<!--      done: false, // Annahme: Neue Listen werden als nicht erledigt erstellt-->
<!--      deadline: newListDeadline,-->
<!--      items: [] // Leere Liste von Artikeln für den Anfang-->
<!--    };-->

<!--    // Sende eine POST-Anfrage an die API, um die neue Einkaufsliste zu erstellen-->
<!--    axios.post('http://localhost:8080/shoppingLists', newShoppingList)-->
<!--        .then((response) => {-->
<!--          // Nach erfolgreicher Erstellung, füge die neue Liste zu den vorhandenen Shopping-Listen hinzu-->
<!--          shoppingLists.value.push(response.data);-->

<!--          // Setze die Formularfelder zurück-->
<!--          newListName.value = '';-->
<!--          newListDeadline.value = '';-->
<!--        })-->
<!--        .catch((error) => {-->
<!--          console.error('Fehler beim Erstellen der Einkaufsliste:', error);-->
<!--        });-->
<!--  } else {-->
<!--    console.error('Ungültige Eingabe für das Erstellen einer Einkaufsliste');-->
<!--  }-->
<!--};-->

<!--const deleteShoppingList = (shoppingListId) => {-->
<!--  axios.delete(`http://localhost:8080/shoppingLists/${shoppingListId}`)-->
<!--      .then(() => {-->
<!--        // Nach erfolgreicher Löschung, entferne die Einkaufsliste aus der Liste der Shopping-Listen-->
<!--        shoppingLists.value = shoppingLists.value.filter(list => list.idShoppingList !== shoppingListId);-->
<!--      })-->
<!--      .catch((error) => {-->
<!--        console.error(`Fehler beim Löschen der Einkaufsliste mit ID ${shoppingListId}:`, error);-->
<!--      });-->
<!--};-->

<!--const addItemToShoppingList = () => {-->
<!--  if (newItemName.value && newItemQuantity && newItemCategory && selectedShoppingList) {-->
<!--    // Erstelle ein Objekt mit den Daten des neuen Artikels-->
<!--    const newItem = {-->
<!--      itemName: newItemName,-->
<!--      quantity: newItemQuantity,-->
<!--      done: false, // Annahme: Neue Artikel werden als nicht erledigt erstellt-->
<!--      categoryID: newItemCategory-->
<!--    };-->

<!--    // Finde die ausgewählte Einkaufsliste-->
<!--    const selectedList = shoppingLists.value.find(list => list.idShoppingList === selectedShoppingList.value);-->

<!--    // Überprüfe, ob die ausgewählte Liste gefunden wurde-->
<!--    if (selectedList) {-->
<!--      // Füge den neuen Artikel zur Liste der Artikel der ausgewählten Einkaufsliste hinzu-->
<!--      selectedList.items.push(newItem);-->

<!--      // Sende eine PUT-Anfrage an die API, um die Einkaufsliste zu aktualisieren-->
<!--      axios.put(`http://localhost:8080/shoppingLists/${selectedShoppingList.value}`, selectedList)-->
<!--          .then(() => {-->
<!--            // Aktualisiere die Shopping-Listen, um die Änderungen zu reflektieren-->
<!--            fetchShoppingLists();-->
<!--          })-->
<!--          .catch((error) => {-->
<!--            console.error('Fehler beim Aktualisieren der Einkaufsliste nach dem Hinzufügen eines Artikels:', error);-->
<!--          });-->
<!--    } else {-->
<!--      console.error(`Die ausgewählte Einkaufsliste mit ID ${selectedShoppingList.value} wurde nicht gefunden`);-->
<!--    }-->

<!--    // Setze die Formularfelder zurück-->
<!--    newItemName.value = '';-->
<!--    newItemQuantity.value = 0;-->
<!--    newItemCategory.value = '';-->
<!--    selectedShoppingList.value = '';-->
<!--  } else {-->
<!--    console.error('Ungültige Eingabe für das Hinzufügen eines Artikels zur Einkaufsliste');-->
<!--  }-->
<!--};-->

<!--// Nachdem die Komponente erstellt wurde, rufe die Shopping-Listen und Kategorien ab-->
<!--onMounted(() => {-->
<!--  fetchShoppingLists();-->
<!--  fetchCategories();-->
<!--});-->
<!--</script>-->

<!--<style>-->
<!--table {-->
<!--  width: 100%;-->
<!--  border-collapse: collapse;-->
<!--  margin-top: 20px;-->
<!--}-->

<!--th, td {-->
<!--  border: 1px solid #ddd;-->
<!--  padding: 8px;-->
<!--  text-align: left;-->
<!--}-->

<!--th {-->
<!--  background-color: #f2f2f2;-->
<!--}-->
<!--</style>-->
