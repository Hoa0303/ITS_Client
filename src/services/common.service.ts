const API_URL = import.meta.env.VITE_API_URL

export const toImageLink = (url: string) => API_URL + '/' + url

export const fomratVND = (value: number) => new Intl.NumberFormat('vi', {
    style: "currency",
    currency: "VND",
}).format(value)

export const fomratUSD = (value: number) => new Intl.NumberFormat('en', {
    style: "currency",
    currency: "USD",
}).format(value)
