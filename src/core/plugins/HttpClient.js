import Request from '../utils/request'
import { inject } from 'vue'

const UnauthorizedHttpCode = 401
const UnprocessableEntityHttpCode = 422

const HttpGetMethod = ['GET', 'HEAD']

const httpClientSymbol = 'httpClient'

const HttpClient = {
  install(
    app,
    options = {
      apiHost: '',
      getAccessToken: null,
      setLoginAction: null,
      setErrorMessage: null,
      paramsSerializer: null,
    }
  ) {
    const request = new Request({
      baseUrl: options.apiHost,
      paramsSerializer: options.paramsSerializer,
      beforeRequest: (config) => {
        const accessToken = options.getAccessToken

        if (accessToken) {
          config.headers['X-Client-Id'] = accessToken.clientId
          config.headers['X-Access-Token'] = accessToken.accessToken
        }

        return config
      },
      onSuccess: (response) => {
        if (response.config.responseType === 'blob') {
          return Promise.resolve(response)
        }

        return Promise.resolve(response.data)
      },
      onError: (error) => {
        const historyBack = error.config.historyBack

        if (!error.response) {
          options.setErrorMessage(error.message, historyBack)

          return Promise.reject(error)
        }

        if (error.response.status === UnauthorizedHttpCode) {
          if (!error.config.__storeDispatch) {
            error.config.__storeDispatch = true

            if (
              historyBack ||
              HttpGetMethod.includes(error.config.method.toUpperCase())
            ) {
              options.setLoginAction('direct')
            } else {
              options.setLoginAction('modal')
            }
          }

          return Promise.reject(error)
        }

        if (error.response.status === UnprocessableEntityHttpCode) {
          return Promise.reject(error)
        }

        options.setErrorMessage(
          error.response.data.detail ||
            error.response.data.message ||
            error.response.data.title ||
            error.response.statusText ||
            '网络请求错误',
          historyBack
        )

        return Promise.reject(error)
      },
    })

    app.config.globalProperties.$http = request
    app.provide(httpClientSymbol, request)
  },
}

export function createHttpClient() {
  return HttpClient
}

export function useHttpClient() {
  return inject(httpClientSymbol)
}
