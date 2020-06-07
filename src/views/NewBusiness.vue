<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form class="form" @submit.prevent="handleSubmit(submit)">
      <div class="logo-container">
        <img
          :src="files.length > 0 ? files[0].blob : 'https://via.placeholder.com/350x150?text=Sua+logo+aqui'"
          class="logo"
        />
        <file-upload
          class="upload-button"
          ref="upload"
          v-model="files"
          @input-filter="inputFilter"
          accept="image/png, image/gif, image/jpeg, image/webp"
        >Selecionar logo</file-upload>
      </div>

      <v-input
        class="field field-half"
        label="Nome da empresa"
        v-model.lazy="form.name"
        rules="required|min:4|max:50"
      />
      <v-select
        class="field field-half"
        label="Categoria"
        optionLabel="name"
        :options="categories"
        :value="form.category"
        :loading="loadingCategories"
        @input="value => form.category = value"
        :reduce="v => v._id"
        rules="required"
      />
      <v-input
        class="field w-full"
        rules="required|min:10|max:100"
        label="Descrição da empresa"
        v-model="form.description"
      />
      <v-input
        class="field field-half"
        rules="required"
        label="E-mail do responsável"
        type="email"
        v-model="form.email"
      />
      <v-input
        class="field field-half"
        label="Telefone da empresa"
        v-model="form.phone"
        type="tel"
        rules="required"
      />
      <v-select
        class="field field-half"
        label="Estado"
        optionLabel="nome"
        :options="ufs"
        :value="form.address.uf_id"
        :loading="loadingUfs"
        @input="value => form.address.uf_id = value"
        rules="required"
      />
      <v-select
        class="field field-half"
        label="Cidade"
        optionLabel="nome"
        :options="cities"
        :value="form.address.city_id"
        :loading="loadingCities"
        @input="value => form.address.city_id = value"
        :disabled="!form.address.uf_id"
        rules="required"
      />
      <v-input
        class="field field-half"
        label="Logradouro"
        v-model="form.address.street"
        rules="required"
      />
      <v-input
        class="field field-quarter"
        label="Número"
        v-model="form.address.number"
        rules="required"
      />
      <v-input
        class="field field-quarter"
        label="Bairro"
        v-model="form.address.neighborhood"
        rules="required"
      />
      <div class="submit">
        <v-button type="submit" :loading="loadingSubmit">Cadastrar</v-button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import FileUpload from 'vue-upload-component'
import { ValidationObserver } from 'vee-validate'
import vInput from '@/components/inputs/Input'
import vSelect from '@/components/inputs/Select'
import vButton from '@/components/buttons/Button'
import { createBusiness, uploadLogo } from '@/services/business'
import { getUfs, getCities } from '@/services/location'
import { getCategories } from '@/services/category'
export default {
  name: 'NewBusiness',
  components: {
    FileUpload,
    vInput,
    vSelect,
    vButton,
    ValidationObserver
  },
  data: () => ({
    ufs: [],
    cities: [],
    categories: [],

    loadingUfs: true,
    loadingCities: false,
    loadingCategories: true,
    loadingSubmit: false,

    files: [],
    form: {
      name: '',
      description: '',
      email: '',
      phone: '',
      category: '',
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        city_id: '',
        uf: '',
        uf_id: ''
      }
    }
  }),
  computed: {
    selectedUf () {
      return this.form.address.uf_id
    },
    selectedCity () {
      return this.form.address.city_id
    }
  },
  methods: {
    async submit () {
      try {
        if (this.files.length === 0) throw new Error('Não há imagem selecionada')
        this.loadingSubmit = true
        const response = await createBusiness(this.form)

        const logoData = new FormData()
        logoData.append('logo', this.files[0].file)
        logoData.append('businessId', response._id)
        await uploadLogo(logoData)
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        this.loadingSubmit = false
      }
    },
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      // Create a blob field
      newFile.blob = ''
      const URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
    loadUfs () {
      getUfs()
        .then(res => {
          this.ufs = res
          this.loadingUfs = false
        })
        .catch(this.loadUfs)
    },

    loadCategories () {
      getCategories()
        .then(res => {
          this.categories = res
          this.loadingCategories = false
        })
        .catch(this.loadCategories)
    },

    loadCities (newUf) {
      getCities(newUf)
        .then(res => {
          this.cities = res
          this.loadingCities = false
        })
        .catch(() => this.loadCities(newUf))
    }
  },

  mounted () {
    this.loadUfs()
    this.loadCategories()
  },

  watch: {
    selectedUf (newUf) {
      if (newUf) {
        this.loadCities(newUf)
        this.loadingCities = true
        this.form.address.uf = this.ufs.find(uf => uf.id === newUf).nome
      }
      this.form.address.city = ''
      this.form.address.city_id = ''
    },
    selectedCity (newCity) {
      if (newCity) {
        this.form.address.city = this.cities.find(
          city => city.id === newCity
        ).nome
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.form
  @apply w-full flex flex-wrap

.logo
  @apply h-48 object-contain
  &-container
    @apply w-full flex flex-col justify-center items-center

.upload-button
  @apply flex w-auto mt-4 py-2 px-4 bg-gray-100 border border-gray-400 rounded-sm
  &:hover
    @apply bg-gray-100
  &:active
    @apply bg-gray-200
  label
    @apply cursor-pointer

.field
  @apply mt-8 mb-2 px-1
  &-quarter
    @apply w-full
    @screen md
      @apply w-1/2
    @screen lg
      @apply w-1/4
  &-half
    @apply w-full
    @screen md
      @apply w-1/2

.submit
  @apply w-full flex justify-center items-center mt-4
  @screen md
    @apply justify-end
  &> button
    @apply border rounded-md border-primary
</style>
