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
    // console.log(this.$store)
    this.$store.dispatch('connpass/getConnpassEvents')
    // this.$store.connpass.actions.getConnpassEvents()
    // console.log(this.sample.counter)
  }
}
</script>
