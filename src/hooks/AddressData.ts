import { ref } from 'vue'

export interface AddressData {
  code: number
  codename: string
  division_type: string
  name: string
}

export function useTableData() {
  const addressData = ref<AddressData[]>([])
  function setAddressData(data: AddressData[]) {
    addressData.value = data
  }
  return {
    addressData,
    setAddressData,
  }
}
