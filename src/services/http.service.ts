import axios from 'axios'
import { getAuthHeader } from './auth.service'

const get = (url: string) => axios.get(url).then((res) => res.data)

const getWithParams = async (url: string, params: any) => {
  try {
    const response = await axios.get(url, { params })
    return response.data
  } catch (error) {
    console.error('Error while making GET request:', error)
    throw error
  }
}

const getWithAuth = (url: string) =>
  axios.get(url, { headers: getAuthHeader() }).then((res) => res.data)

const getWithAuthPagination = (
  url: string,
  page: number,
  pageSize: number,
  search: string,
) =>
  axios
    .get(url, {
      headers: getAuthHeader(),
      params: {
        page: page,
        pageSize: pageSize,
        search: search ?? '',
      },
    })
    .then((res) => res.data)

const post = (url: string, data: any) =>
  axios.post(url, data).then((res) => res.data)

const postWithAuth = (url: string, data: any) =>
  axios.post(url, data, { headers: getAuthHeader() }).then((res) => res.data)

const put = (url: string, data: any) =>
  axios.put(url, data).then((res) => res.data)

const putWithAuth = (url: string, data: any) =>
  axios.put(url, data, { headers: getAuthHeader() }).then((res) => res.data)

const del = (url: string) => axios.delete(url).then((res) => res.data)

const delWithAuth = (url: string) =>
  axios.delete(url, { headers: getAuthHeader() }).then((res) => res.data)

const httpService = {
  get,
  getWithParams,
  getWithAuth,
  getWithAuthPagination,
  post,
  postWithAuth,
  put,
  putWithAuth,
  del,
  delWithAuth,
}
export default httpService
