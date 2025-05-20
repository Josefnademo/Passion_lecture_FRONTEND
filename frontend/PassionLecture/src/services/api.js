//
// This is not used for this project, my teammates and I decided to use fetch directly instead of AXIOS.
//

const API_URL = 'http://localhost:9999/api'

export default {
  async login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    if (data.token) {
      localStorage.setItem('token', `Bearer ${data.token}`)
    }
    return data
  },

  async getAllBooks(title = null) {
    const url =
      title && title.title.length > 2 ? `${API_URL}/books?titre=${title.title}` : `${API_URL}/books`

    const response = await fetch(url, {
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    })
    return response.json()
  },

  async getBookById(id) {
    const response = await fetch(`${API_URL}/books/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    })
    return response.json()
  },

  async getAllAuthors() {
    const response = await fetch(`${API_URL}/authors`, {
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    })
    return response.json()
  },

  async getAllCategories() {
    const response = await fetch(`${API_URL}/categories/`, {
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    })
    return response.json()
  },

  async getUserById(id) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    })
    return response.json()
  },

  async createBook(data) {
    const response = await fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },
}
