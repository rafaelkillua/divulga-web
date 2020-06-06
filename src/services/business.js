import api from './api'

export const getBusiness = params => api.get('/business', { params }).then(res => res.data)
