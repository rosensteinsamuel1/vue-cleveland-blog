import Vue from 'vue'
import Vuex from 'vuex'
import vuetify from 'vuetify'
import componentStore from '@/store/store'

import { shallowMount } from '@vue/test-utils'
import Navbar from '@/components/Navbar'

Vue.use(Vuex)
Vue.use(vuetify)

const store = new Vuex.Store(componentStore)

describe('Navbar Component', () => {
    it('renders', () => {
        const wrapper = shallowMount(Navbar, {
            store
        })
        expect(wrapper.exists()).toBeTruthy()
        // expect(wrapper.html()).toContain('')
    })
    it('submits the correct input values', () => {

    })
})