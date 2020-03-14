import { ActionContext, ActionTree } from 'vuex'
import { EventState } from '@/store/events'
import { State } from '@/store/index'

/* eslint-disable camelcase */
export interface ConnpassEventResponse {
  title: string
  catch: string
  description: string
  event_url: string
  started_at: string
  ended_at: string
  limit: number
  address: string
  place: string
}

export interface ConnpassResponse {
  results_returned: number
  events: ConnpassEventResponse[]
}
/* eslint-enable camelcase */

export const actions: ActionTree<EventState, State> = {
  async getConnpassEvents(
    { commit }: ActionContext<EventState, State>,
    period: string
  ) {
    const events: ConnpassEventResponse[] = await this.$axios.$get(
      `/.netlify/functions/connpass?period=${period}`
    )

    commit(
      'events/setEvents',
      events
        .filter((e: ConnpassEventResponse) => e.limit >= 30)
        .map(
          (e: ConnpassEventResponse) =>
            ({
              title: e.title,
              catch: e.catch,
              description: e.description,
              eventUrl: e.event_url,
              startedAt: this.$moment(e.started_at).format(
                'YYYY-MM-DD HH:mm:ss (ddd)'
              ),
              endedAt: this.$moment(e.ended_at).format(
                'YYYY-MM-DD HH:mm:ss (ddd)'
              ),
              address: `${e.address} ${e.place}`
            } as EventState)
        ),
      { root: true }
    )
  }
}
