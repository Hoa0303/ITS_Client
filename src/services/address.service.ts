import axios from 'axios'

// const base = 'https://provinces.open-api.vn/api'
const base = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data'

const tokenAPI = '69e8dbb1-8b93-11ef-8e53-0a00184fe694'

const getProvince = async () =>
  await axios
    .get(base + `/province`, {
      headers: { token: tokenAPI },
    })
    .then((res) => res.data)

const getDistricts = async (id: number) =>
  await axios
    .get(base + `/district`, {
      headers: { token: tokenAPI },
      params: { province_id: id },
    })
    .then((res) => res.data)

const getWards = async (id: number) =>
  await axios
    .get(base + `/ward`, {
      headers: { token: tokenAPI },
      params: { district_id: id },
    })
    .then((res) => res.data)

const addressService = {
  getProvince,
  getDistricts,
  getWards,
}
export default addressService
