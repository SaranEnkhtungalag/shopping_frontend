import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import ShoppingListItems from '../shoppingList/ShoppingListItems.vue'

const shoppingList = {
  "items": [
    {
      "itemID": 1,
      "itemName": "Milch",
      "quantity": 3,
      "categoryID": {
        "categoryID": 1,
        "categoryName": "Lebensmittel"
      },
    },
    {
      "itemID": 3,
      "itemName": "T-Shirt",
      "quantity": 5,
      "categoryID": {
        "categoryID": 3,
        "categoryName": "Kleidung"
      },
    },
  ]
}

describe('ShoppingListItems', () => {
  it('renders properly', () => {
    const wrapper = mount(ShoppingListItems, { props: { shoppingList, deleteItem: vi.fn() } })
    const itemsTable = wrapper.find('table')
    expect(itemsTable.text()).toContain('Lebensmittel')
    expect(itemsTable.text()).toContain('Kleidung')
    expect(itemsTable.text()).toContain('Milch')
    expect(itemsTable.text()).toContain('T-Shirt')
    expect(itemsTable.find('button').text()).toContain('delete')
  })

  it('delete item should be called', async () => {
    const deleteItem = vi.fn()
    const wrapper = mount(ShoppingListItems, { props: { shoppingList, deleteItem } })
    const deleteButton = wrapper.find('table button')
    expect(deleteButton.text()).toContain('delete')
    await deleteButton.trigger('click')
    expect(deleteItem).toBeCalledTimes(1)
  })
})
