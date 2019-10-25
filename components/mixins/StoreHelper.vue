<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IState } from '@/store/index'

@Component
class StoreHelper extends Vue {
  getState<K extends keyof IState>(key: K): IState[K] {
    return this.$store.state[key]
  }
}

export default StoreHelper
</script>
