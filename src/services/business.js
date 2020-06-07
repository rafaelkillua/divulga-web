import api from './api'

export const getBusiness = params => api.get('/business', { params }).then(res => res.data)

export const createBusiness = data => api.post('/business', data).then(res => res.data)

export const uploadLogo = data => api.post('/business-logo', data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => res.data)
