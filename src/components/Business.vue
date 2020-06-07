<template>
  <div class="business-wrapper">
    <div class="business">
      <img
        class="logo"
        v-if="business.logo && business.logo.secure_url"
        :src="business.logo.eager.length > 0 ? business.logo.eager[0].secure_url : business.logo.secure_url"
        :alt="`Logo ${business.name}`"
      />
      <h2 class="title">{{business.name}}</h2>
      <p class="category">
        <category-icon class="icon" decorative />
        {{business.category && business.category.name}}
      </p>
      <h6 class="description">
        <business-icon class="icon" decorative />
        {{business.description}}
      </h6>
      <p class="email">
        <email-icon class="icon" decorative />
        {{business.email}}
      </p>
      <p class="phone">
        <phone-icon class="icon" decorative />
        {{business.phone | phoneMask}}
      </p>
      <p class="address">
        <address-icon class="icon" decorative />
        {{business.address.street}}, {{business.address.number}} - {{business.address.neighborhood}} - {{business.address.city}} - {{business.address.uf}}
      </p>
    </div>
  </div>
</template>

<script>
import BusinessIcon from 'vue-material-design-icons/Store'
import EmailIcon from 'vue-material-design-icons/Email'
import PhoneIcon from 'vue-material-design-icons/Phone'
import AddressIcon from 'vue-material-design-icons/Map'
import CategoryIcon from 'vue-material-design-icons/Shape'
import masksMixin from '@/mixins/masks'

export default {
  mixins: [masksMixin],
  components: {
    BusinessIcon,
    EmailIcon,
    PhoneIcon,
    AddressIcon,
    CategoryIcon
  },
  props: {
    business: {
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.business-wrapper
  @apply w-full px-2 flex
  @screen md
    @apply w-1/2
  @screen lg
    @apply w-1/3

.business
  @apply w-full p-4 border border-gray-500 rounded-lg mb-4 leading-7

.logo
  @apply w-full h-48 object-contain bg-center

.title
  @apply font-bold text-center text-primary mb-2 text-lg

.icon
  @apply text-red-600 mr-1

.category
  @apply flex text-sm

.description
  @apply flex text-sm

.email
  @apply flex text-sm font-bold

.phone
  @apply flex text-sm font-bold

.address
  @apply flex text-sm
</style>
