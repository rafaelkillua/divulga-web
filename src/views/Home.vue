<template>
  <div>
    <section class="home">
      <h2 class="title">Bem vindos ao Divulga, onde empresas pequenas têm nome!</h2>
    </section>
    <section>
      <filters
        :businessName.sync="businessName"
        :selectedCategory.sync="filters.selectedCategory"
        :selectedUf.sync="filters.selectedUf"
        :selectedCity.sync="filters.selectedCity"
      />
    </section>
    <section class="business-list">
      <business v-for="bus of business" :business="bus" :key="bus._id" />
    </section>
  </div>
</template>

<script>
import Filters from '@/components/Filters'
import Business from '@/components/layout/Business'
import { getBusiness } from '@/services/business'

const perPage = 12

export default {
  name: 'Home',

  components: {
    Filters,
    Business
  },

  data: () => ({
    timer: null,
    pagination: {
      page: 1,
      perPage,
      total: 0
    },
    business: [],

    businessName: '',
    filters: {
      selectedCategory: '',
      selectedUf: '',
      selectedCity: ''
    }
  }),

  methods: {
    getBusiness () {
      const params = {
        name: this.businessName,
        category: this.filters.selectedCategory,
        uf_id: this.filters.selectedUf,
        city_id: this.filters.selectedCity,
        page: this.pagination.page,
        perPage: this.pagination.perPage
      }
      return getBusiness(params)
        .then(res => {
          this.business = res.list
          this.pagination = res.pagination
          this.timer = null
          return res
        })
        .catch(error => console.error(error))
    }
  },

  mounted () {
    this.getBusiness()
  },

  watch: {
    filters: {
      handler: function () {
        this.pagination.page = 1
        this.getBusiness()
      },
      deep: true
    },
    businessName () {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(this.getBusiness, 1000)
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  @apply text-xl font-bold text-center

.home
  @apply mb-4

.business-list
  @apply w-full flex flex-wrap mt-4

.business-no-data
  @apply w-full flex justify-center items-center mt-4
</style>
