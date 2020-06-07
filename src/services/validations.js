import { extend } from 'vee-validate'
import { email, required, min, max } from 'vee-validate/dist/rules'

const validations = [
  {
    name: 'required',
    ...required,
    message: 'Esse campo é obrigatório'
  },
  {
    name: 'min',
    ...min,
    message: 'Esse campo deve ter no mínimo {length} caracteres'
  },
  {
    name: 'max',
    ...max,
    message: 'Esse campo deve ter no máximo {length} caracteres'
  },
  {
    name: 'email',
    ...email,
    message: 'E-mail inválido'
  }
]

validations.forEach(val => {
  const { name, ...rest } = val
  extend(name, {
    ...rest
  })
})
