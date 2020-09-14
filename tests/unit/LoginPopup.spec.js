import Vue from 'vue'
import Vuex from 'vuex'
import vuetify from 'vuetify'
import componentStore from '@/store/store'

import { shallowMount } from '@vue/test-utils'
import LoginPopup from '@/components/LoginPopup'

Vue.use(Vuex)
Vue.use(vuetify)

const store = new Vuex.Store(componentStore)

describe('LoginPopup Component', () => {
    it('renders', () => {
        const wrapper = shallowMount(LoginPopup, {
            store
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.html()).toMatchSnapshot()
    })
    it('matches snapshot', () => {
        const wrapper = shallowMount(LoginPopup, {
            store
        })
        expect(wrapper).toMatchSnapshot()
    })
})