import axios from 'axios'
import Cookies from 'js-cookie'
import { get } from 'lodash'

const API_URL = 'https://localhost:7171/api' + '/auth'

const login = async (data: any) =>
  await axios.post(API_URL + '/login', data).then((res) => {
    const expires = 12 * 60 * 60 * 1000
    const in12Hour = new Date(new Date().getTime() + expires)
    Cookies.set('client_data', JSON.stringify(res.data), { expires: in12Hour })
    return res
  })

const send_code_reset_pass = async (email: string) =>
  await axios.post(API_URL + '/send-code-reset-password', { email })

const reset_password = async (data: any) =>
  await axios.post(API_URL + '/reset-password', data)

const send_code_register = async (email: string) =>
  await axios.post(API_URL + '/send-code', { email })

const register = async (data: any) =>
  await axios.post(API_URL + '/register', data)

const getAuthCookie = () => {
  var data = Cookies.get('client_data')
  return data ? JSON.parse(data) : data
}

export const getAuthName = () => {
  const token = getAuthCookie()
  if (token && token.name) {
    return token.name
  }
}

export const getAuthToken = () => {
  const token = getAuthCookie()
  if (token && token.jwt) {
    return token.jwt
  }
}

export const getAuthPhone = () => {
  const token = getAuthCookie()
  if (token && token.phoneNumber) {
    return token.phoneNumber
  }
}

export const getAuthHeader = () => {
  const token = getAuthCookie()
  if (token && token.jwt) {
    return { Authorization: `Bearer ${token.jwt}` }
  }
  return {}
}

const authService = {
  login,
  send_code_reset_pass,
  reset_password,
  send_code_register,
  register,
  getAuthCookie,
  // logout,
  // sendCode,
  // getCurrentUser,
  // loginGoogle,
}
export default authService
