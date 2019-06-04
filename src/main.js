import Vue from 'vue'
import App from './App.vue'
import InputSetComponent from './components/InputSetComponent.vue'

Vue.config.productionTip = false

Vue.component('input-set', InputSetComponent)

new Vue({
  render: h => h(App),
}).$mount('#app')
