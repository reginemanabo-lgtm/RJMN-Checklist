import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

export async function fetchUsers(limit = 30) {
  const { data } = await api.get('/users', {
    params: { limit, select: 'id,firstName,lastName,email,username,image' },
  })
  return data.users
}

export function getErrorMessage(error) {
  if (error.code === 'ECONNABORTED') {
    return 'The request took too long. Please check your connection and try again.'
  }
  if (error.response) {
    return `The server responded with an error (${error.response.status}). Please try again.`
  }
  if (error.request) {
    return 'Unable to reach DummyJSON. Please check your internet connection.'
  }
  return 'Something went wrong while loading user information.'
}
