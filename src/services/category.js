import api from './api'

export const getCategories = () => api.get('/category').then(res => res.data)
