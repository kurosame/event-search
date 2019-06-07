<script lang="ts">
import { IState } from '@/store/index'
import { Component, Vue } from 'vue-property-decorator'

@Component
class StoreHelper extends Vue {
  getState<K extends keyof IState>(key: K): IState[K] {
    return this.$store.state[key]
  }
}

export default StoreHelper
</script>
