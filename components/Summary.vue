<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
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
        <td v-show="false">{{ item.description }}</td>
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
/deep/ .description {
  display: none;
}
</style>
<script lang="ts">
import StoreHelper from '@/components/mixins/StoreHelper.vue'
import { IEventState } from '@/store/events'
import { Component, Mixins } from 'vue-property-decorator'
import { Moment } from 'moment'
import chunk from 'lodash/chunk'

@Component
class Summary extends Mixins(StoreHelper) {
  search: string = ''

  pagination: { sortBy: string } = { sortBy: 'startedAt' }

  loading: boolean = true

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

  get items(): IEventState[] {
    return this.getState('events').events
  }

  get endDate(): Moment {
    return (this as any)
      .$moment()
      .add(1, 'months')
      .endOf('month')
  }

  getDateRange(
    dateRange: string[] = [],
    nowDate: Moment = (this as any).$moment()
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
        this.$store.dispatch('atnd/getAtndEvents', d.join(','))
      ),
      ...chunk(this.getDateRange(), 8).map(d =>
        this.$store.dispatch('connpass/getConnpassEvents', d.join(','))
      )
    ]).then(() => (this.loading = false))
  }
}

export default Summary
</script>
