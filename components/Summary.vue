<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :pagination.sync="pagination"
    :loading="loading"
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
import { Moment } from 'moment'
import chunk from 'lodash/chunk'

@Component
class Summary extends Mixins(StoreHelper) {
  pagination: { sortBy: string } = { sortBy: 'startedAt' }

  loading: boolean = true

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

  get endDate(): Moment {
    return this.$moment()
      .add(1, 'months')
      .endOf('month')
  }

  getDateRange(
    dateRange: string[] = [],
    nowDate: Moment = this.$moment()
  ): string[] {
    return nowDate.isSameOrBefore(this.endDate)
      ? this.getDateRange(
          [...dateRange, nowDate.format('YYYYMMDD')],
          nowDate.add(1, 'days')
        )
      : dateRange
  }

  mounted() {
    Promise.all([
      ...chunk(this.getDateRange(), 8).map(d =>
        this.$store.dispatch('atnd/getAtndEvents', d)
      ),
      ...chunk(this.getDateRange(), 8).map(d =>
        this.$store.dispatch('connpass/getConnpassEvents', d)
      )
    ]).then(() => (this.loading = false))
  }
}

export default Summary
</script>
