import Cookie from 'js-cookie'
import Strapi from 'strapi-sdk-javascript/build/main'
import Router from 'next/router'

const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi (apiUrl)

export const login = (email, password) => {
    if (!process.browser) {
      return
    }
    // Get a token
   strapi.login(email, password)
    .then(res => {
      setToken(res)
    })
    // .then(Router.push('/'))
    return Promise.resolve()
  }

export const setToken = (token) => {
  if (!process.browser) {
    return
  }
  Cookie.set('user', token.user.username)
  Cookie.set('jwt', token.jwt)
  if(Cookie.get('user')) {
    Router.push('/')
  }
}

export const unsetToken = () => {
  if (!process.browser) {
    return
  }
  Cookie.remove('jwt')
  Cookie.remove('user')
  Cookie.remove('secret')

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
}

export const getUserFromServerCookie = (req) => {
  if (!req.headers) {
    return undefined
  }
  console.log("get user from server")
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getUserFromLocalCookie = () => {
  console.log("user from local = " +  Cookie.get('user'))
  return  Cookie.get('user')
}

export const setSecret = (secret) => Cookie.set('secret', secret)

export const checkSecret = (secret) => Cookie.get('secret') === secret