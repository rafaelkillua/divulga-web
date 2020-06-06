export default {
  filters: {
    phoneMask: function (value) {
      if (!value) return ''
      value = String(value)
      value = value.replace(/\D/g, '')
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
      value = value.replace(/(\d)(\d{4})$/, '$1-$2')
      return value
    }
  }
}
