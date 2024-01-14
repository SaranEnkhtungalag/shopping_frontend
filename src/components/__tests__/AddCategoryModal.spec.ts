import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import AddCategoryModal from '../shoppingList/AddCategoryModal.vue'

describe('AddCategoryModal', () => {
  it('should renders properly', async () => {
    const wrapper = mount(AddCategoryModal, { props: { addCategory: vi.fn() } })
    expect(wrapper.text()).toContain('add category')
    expect(wrapper.text()).not.toContain('Category name')
    await wrapper.find('button.btn-link').trigger('click')
    expect(wrapper.text()).toContain('Category name')
  })

  it('should call addCategory', async () => {
    const addCategory = vi.fn()
    const wrapper = mount(AddCategoryModal, { props: { addCategory } })
    const showButton = wrapper.find('button.btn-link')
    await showButton.trigger('click')
    expect(wrapper.text()).toContain('Category name')
    await wrapper.find('button.btn-primary').trigger('click')
    expect(wrapper.text()).not.toContain('Category name')
    expect(addCategory).toBeCalledTimes(1)
  })

  it('should hide modal when press cancel', async () => {
    const wrapper = mount(AddCategoryModal, { props: { addCategory: vi.fn() } })
    const showButton = wrapper.find('button.btn-link')
    await showButton.trigger('click')
    expect(wrapper.text()).toContain('Category name')
    await wrapper.find('button.btn-secondary').trigger('click')
    expect(wrapper.text()).not.toContain('Category name')
  })
})
