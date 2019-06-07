<template>
  <v-data-table :headers="headers" :items="items">
    <template #items="{ item }">
      <td v-for="h of headers" :key="h.value">{{ item[h.value] }}</td>
    </template>
  </v-data-table>
</template>
<script lang="ts">
import StoreHelper from '@/components/mixins/StoreHelper.vue'
import { IEventState } from '@/store/events'
import { Component, Mixins } from 'vue-property-decorator'

@Component
class Summary extends Mixins(StoreHelper) {
  get headers(): { text: string; value: string }[] {
    return [
      { text: 'タイトル', value: 'title' },
      { text: 'URL', value: 'eventUrl' },
      { text: '開始日時', value: 'startedAt' },
      { text: '終了日時', value: 'endedAt' },
      { text: '会場', value: 'address' }
    ]
  }

  get items(): IEventState[] {
    return this.getState('events').events
  }
}

export default Summary
</script>
