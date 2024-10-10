import axios from 'axios'

const base = 'https://provinces.open-api.vn/api'

const getProvince = async () => await axios.get(base + `/p`)

const getDistricts = async (id: number) =>
  await axios.get(base + `/p/${id}`, { params: { depth: 2 } })

const getWards = async (id: number) =>
  await axios.get(base + `/d/${id}`, { params: { depth: 2 } })

const addressService = {
  getProvince,
  getDistricts,
  getWards,
}
export default addressService
