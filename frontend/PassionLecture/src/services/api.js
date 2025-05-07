import axios from 'axios'

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:9999/api/',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: token,
  },
  timeout: 10000,
})

let token = localStorage.getItem('token') || null

// Add request interceptor for auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default {
  login(credentials) {
    return apiClient.post('/login', credentials).then((response) => {
      const newToken = response.data.token // Stocker le token reçu = response.data.token // Stocker le token reçu
      localStorage.setItem('token', `Bearer ${newToken}`)
      apiClient.defaults.headers.common['Authorization'] = localStorage.getItem('token') // Ajouter le token aux headers
      return response
    })
  },

  getAllBooks(title = null) {
    if (title != null && title.title.length > 2) {
      return apiClient.get('/books?titre=' + title.title)
    }
    return apiClient.get('/books')
  },
  getBookById(id) {
    return apiClient.get(`/books/${id}`)
  },
  getAllAuthors() {
    return apiClient.get('/authors')
  },
  getAllCategories() {
    return apiClient.get('/categories/')
  },
  getUserById(id) {
    return apiClient.get(`/users/${id}`)
  },
  createBook(data) {
    return apiClient.post(`/books`, data)
  },
}
