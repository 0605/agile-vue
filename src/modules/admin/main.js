import { createApp } from 'vue'
import qs from 'qs'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import router from './router'
import store from './store'

import App from './App.vue'

import './registerServiceWorker'

import { createHttpClient } from '@core/plugins/HttpClient'
import DeleteDialog from './plugins/DeleteDialog'
import PermissionCheck from './plugins/PermissionCheck'

const app = createApp(App)

app.use(ElementPlus)

app.use(createHttpClient(), {
  apiHost: document
    .querySelector('meta[name="api-host"]')
    .getAttribute('content'),
  store,
  getAccessToken: store.getters['auth/getAccessToken'],
  setLoginAction: async (action) => {
    await store.dispatch('auth/setLoginAction', action)
  },
  setErrorMessage: async (message, historyBack) => {
    await store.dispatch('setError', {
      message: message,
      historyBack: historyBack,
    })
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      arrayFormat: process.env.VUE_APP_QS_ARRAY_FORMAT || 'brackets',
    })
  },
})

app.use(PermissionCheck, {
  store,
})

app.use(DeleteDialog, {
  MessageBox: ElementPlus.MessageBox,
})

app.use(store)
app.use(router)
app.mount('#root')
