<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1">
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right">{{ props.item.iron }}</td>
    </template>
  </v-data-table>
</template>
<script lang="ts">
import { IEventsState } from '@/store/event'
import { Component, Vue } from 'vue-property-decorator'

@Component
class Summary extends Vue {
  static get headers(): { text: string; value: string }[] {
    return [
      { text: 'タイトル', value: 'title' },
      { text: 'URL', value: 'eventUrl' },
      { text: '開始日時', value: 'startedAt' },
      { text: '終了日時', value: 'endedAt' },
      { text: '会場', value: 'address' }
    ]
  }

  get items(): IEventsState {
    return this.$store.state.event.events
  }
}

export default Summary
</script>
