<template>
  <v-card>
    <v-card-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        label="Search"
        placeholder="nuxt 東京 etc.."
        append-icon="search"
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :rows-per-page-items="[10, 50, 100]"
      :pagination.sync="pagination"
      :loading="loading"
    >
      <template #items="{ item }">
        <td>{{ item.title }}</td>
        <td>{{ item.catch }}</td>
        <td v-show="false">
          {{ item.description }}
        </td>
        <td>
          <a :href="item.eventUrl" target="_blank">{{ item.eventUrl }}</a>
        </td>
        <td>{{ item.startedAt }}</td>
        <td>{{ item.endedAt }}</td>
        <td>{{ item.address }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>
<style scoped lang="scss">
::v-deep .description {
  display: none;
}
</style>
<script lang="ts">
import chunk from 'lodash/chunk'
import { Moment } from 'moment'
import { Component, Mixins } from 'vue-property-decorator'
import StoreHelper from '@/components/mixins/StoreHelper.vue'
import { EventState } from '@/store/events'

@Component
class Summary extends Mixins(StoreHelper) {
  search = ''

  pagination: { sortBy: string } = { sortBy: 'startedAt' }

  loading = true

  get headers(): { text: string; value: string; class?: string[] | string }[] {
    return [
      { text: 'タイトル', value: 'title' },
      { text: 'キャッチ', value: 'catch' },
      { text: '概要', value: 'description', class: 'description' },
      { text: 'URL', value: 'eventUrl' },
      { text: '開始日時', value: 'startedAt' },
      { text: '終了日時', value: 'endedAt' },
      { text: '会場', value: 'address' }
    ]
  }

  get items(): EventState[] {
    return (this.getState('events') || { events: [] }).events
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
    /* eslint-disable indent */
    return nowDate.isSameOrBefore(this.endDate)
      ? this.getDateRange(
          [...dateRange, nowDate.format('YYYYMMDD')],
          nowDate.add(1, 'days')
        )
      : dateRange
    /* eslint-enable indent */
  }

  mounted(): void {
    Promise.all([
      ...chunk(this.getDateRange(), 8).map(d =>
        this.$store.dispatch('atnd/getAtndEvents', d.join(','))
      ),
      ...chunk(this.getDateRange(), 5).map(d =>
        this.$store.dispatch('connpass/getConnpassEvents', d.join(','))
      )
    ]).then(() => (this.loading = false))
  }
}

export default Summary
</script>
