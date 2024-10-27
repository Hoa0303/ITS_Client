import { ref } from 'vue'

export interface UserData {
  id: string
  email: string
  fullName: string
  phoneNumber: string
}

export function useTableData() {
  //User Data
  const usersData = ref<UserData>()
  function setUserData(data: UserData) {
    usersData.value = data
  }

  return {
    usersData,
    setUserData,
  }
}
