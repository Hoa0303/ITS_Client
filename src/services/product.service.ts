import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + "/api/products"

const getAll = async (page: number, pageSize: number, search: any) => await axios.get(API_URL, {
    params: {
        page: page, pageSize: pageSize, search: search ?? '',
    }
})

const filterProduct = async (params: any) =>
    await axios.get(API_URL + `/filters?${params}`)

const getVersion = async (data: any) =>
    await axios.get(API_URL + "/findversion", {
        params: data
    })

// const create = async (data: any) =>
//     await axios.post(API_URL + '/create', data)

// const getProduct = async (id: number) =>
//     await axios.get(API_URL + `/get/${id}`)

// const update = async (id: any, data: any) =>
//     await axios.put(API_URL + `/update/${id}`, data)

// const remove = async (id: any) =>
//     await axios.delete(API_URL + `/delete/${id}`)

const productService = {
    getAll,
    filterProduct,
    getVersion,
    // getProduct,
    // create,
    // update,
    // remove
}
export default productService