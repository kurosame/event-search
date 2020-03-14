<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from '@/store/index'

@Component
class StoreHelper extends Vue {
  getState<K extends keyof State>(key: K): State[K] {
    return this.$store.state[key]
  }
}

export default StoreHelper
</script>
