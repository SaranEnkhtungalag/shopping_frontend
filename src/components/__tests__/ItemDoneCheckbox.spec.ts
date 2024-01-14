import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ItemDoneCheckbox from '../shoppingList/ItemDoneCheckbox.vue'

describe('ItemDoneCheckbox', () => {
  it('renders properly', async () => {
    const wrapper = mount(ItemDoneCheckbox, { props: { itemID: 1 } })
    const { element } = wrapper.find('input')
    expect(element.checked).toBeFalsy()
    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(element.checked).toBeTruthy()
  })
})
