import api from './api'

const _base = 'https://servicodados.ibge.gov.br/api/v1/localidades'

export const getUfs = () => api.get(`${_base}/estados`, { params: { orderBy: 'nome' } }).then(res => res.data)

export const getCities = uf => api.get(`${_base}/estados/${uf}/municipios`, { params: { orderBy: 'nome' } }).then(res => res.data)
