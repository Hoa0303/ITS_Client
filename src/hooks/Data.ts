import { ref } from 'vue'

export interface BrandsTableData {
  id: string
  name: string
  image: string
}

export interface CategoryTableData {
  id: string
  name: string
}

export interface ColorTableData {
  id: string
  name: string
}

export interface CartTableData {
  id: string
  productId: number
  productName: string
  categoryName: string
  rom: number
  colorId: number
  colorName: string
  discount: number
  originPrice: number
  price: number
  quantity: number
  imageUrl: string
  inStock: number
  showIcon: boolean
}

export function useTableData() {
  //Brands Data
  const brandsData = ref<BrandsTableData[]>([])
  function setBrandsData(data: BrandsTableData[]) {
    brandsData.value = data
  }

  //Category Data
  const categoriesData = ref<CategoryTableData[]>([])
  function setcategoriesData(data: CategoryTableData[]) {
    categoriesData.value = data
  }

  //Color Data
  const colorData = ref<ColorTableData[]>([])
  function setColorData(data: ColorTableData[]) {
    colorData.value = data
  }

  //Cart Data
  const cartData = ref<CartTableData[]>([])
  function setCartData(data: CartTableData[]) {
    cartData.value = data
  }

  return {
    brandsData,
    setBrandsData,
    categoriesData,
    setcategoriesData,
    colorData,
    setColorData,
    cartData,
    setCartData,
  }
}
