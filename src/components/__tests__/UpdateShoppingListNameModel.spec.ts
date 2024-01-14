import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UpdateShoppingListNameModel from '../shoppingList/UpdateShoppingListNameModal.vue'

describe('AddNameModal', () => {
  it('should renders properly', async () => {
    const wrapper = mount(UpdateShoppingListNameModel, { props: { update: vi.fn() } })
    expect(wrapper.find('.modal').exists()).toBe(false)
    expect(wrapper.text()).toContain('update name')
    expect(wrapper.text()).not.toContain('Shopping list name')
    await wrapper.find('button.btn-link').trigger('click')
    expect(wrapper.text()).toContain('Shopping list name')
  })

  it('should call update name', async () => {
    const update = vi.fn()
    const wrapper = mount(UpdateShoppingListNameModel, { props: { update } })
    const showButton = wrapper.find('button.btn-link')
    await showButton.trigger('click')
    expect(wrapper.text()).toContain('Shopping list name')
    await wrapper.find('button.btn-primary').trigger('click')
    expect(wrapper.text()).not.toContain('Shopping list name')
    expect(update).toBeCalledTimes(1)
  })

  it('should hide modal when press close', async () => {
    const wrapper = mount(UpdateShoppingListNameModel, { props: { update: vi.fn() } })
    const showButton = wrapper.find('button.btn-link')
    await showButton.trigger('click')
    expect(wrapper.text()).toContain('Shopping list name')
    await wrapper.find('button.btn-secondary').trigger('click')
    expect(wrapper.text()).not.toContain('Shopping list name')
  })
})