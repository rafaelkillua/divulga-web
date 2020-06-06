<template>
  <div>
    <section class="home">
      <h2 class="title">Bem vindos ao Divulga, onde empresas pequenas têm nome!</h2>
    </section>
    <section>
      <filters
        :selectedUf.sync="selectedUf"
        :selectedCity.sync="selectedCity"
        :businessName.sync="businessName"
      />
    </section>
    <section>

    </section>
  </div>
</template>

<script>
import Filters from '@/components/Filters'

export default {
  name: 'Home',

  components: {
    Filters
  },

  data: () => ({
    selectedUf: '',
    selectedCity: '',
    businessName: ''
  })
}
</script>

<style lang="sass" scoped>
.title
  @apply text-xl font-bold text-center

.home
  @apply mb-8
</style>
