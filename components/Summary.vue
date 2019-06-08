<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :pagination.sync="pagination"
    :loading="!items.length"
  >
    <template #items="{ item }">
      <td>{{ item.title }}</td>
      <td>
        <a :href="item.eventUrl" target="_blank">{{ item.eventUrl }}</a>
      </td>
      <td>{{ item.startedAt }}</td>
      <td>{{ item.endedAt }}</td>
      <td>{{ item.address }}</td>
    </template>
  </v-data-table>
</template>
<script lang="ts">
import StoreHelper from '@/components/mixins/StoreHelper.vue'
import { IEventState } from '@/store/events'
import { Component, Mixins } from 'vue-property-decorator'

@Component
class Summary extends Mixins(StoreHelper) {
  pagination: { sortBy: string } = { sortBy: 'startedAt' }

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
