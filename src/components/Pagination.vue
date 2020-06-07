<template>
  <paginate
    v-show="totalPages !== 1"
    :value="pagination.page"
    :page-count="totalPages"
    :click-handler="newPage => $emit('changePage', newPage)"
    prev-text="<"
    next-text=">"
    container-class="pagination-container"
    page-class="page"
    prev-class="page"
    next-class="page"
    page-link-class="page-link"
    prev-link-class="page-link"
    next-link-class="page-link"
    active-class="page-active"
    disabled-class="page-disabled"
  />
</template>

<script>
import Paginate from 'vuejs-paginate'

export default {
  components: {
    Paginate
  },

  props: {
    pagination: {
      required: true
    }
  },

  computed: {
    totalPages () {
      return Math.ceil(this.pagination.total / this.pagination.perPage)
    }
  }
}
</script>

<style lang="sass">
.pagination-container
  @apply w-full flex justify-end

.page
  @apply h-8 w-8 bg-white border shadow-inner rounded-sm
  &-link
    @apply w-full h-full flex items-center justify-center
  &-active
    @apply text-white bg-primary
  &-disabled
    @apply bg-gray-200 text-gray-500
</style>
