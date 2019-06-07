<template>
  <Summary />
</template>

<script>
import Summary from '@/components/Summary.vue'

export default {
  components: {
    Summary
  },
  mounted() {
    this.$store.dispatch('connpass/getConnpassEvents')
  }
}
</script>
