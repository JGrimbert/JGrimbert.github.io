import { mount } from '@vue/test-utils'
import MerxBiblio from './MerxBiblio.vue'

describe('MerxBiblio', () => {
    it('should display input search', () => {
        const msg = 'Rechercher un bouquin'
        const wrapper = mount(MerxBiblio, { props: { msg } })

        expect(wrapper.find('input').text()).toEqual(msg)
    })
})
