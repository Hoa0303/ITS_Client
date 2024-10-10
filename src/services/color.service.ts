import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + "/api/colors"

const getAll = async () => await axios.get(API_URL)

const getColor = async (id: number) => {
    const res = await axios.get(API_URL + `/${id}`)
    return res.data.name;
}

const colorService = {
    getAll,
    getColor
}
export default colorService