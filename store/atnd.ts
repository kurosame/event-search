import { ActionContext, ActionTree } from 'vuex'
import { EventState } from '@/store/events'
import { State } from '@/store/index'

/* eslint-disable camelcase */
export interface AtndEventResponse {
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

export interface AtndResponse {
  results_returned: number
  events: { event: AtndEventResponse }[]
}
/* eslint-enable camelcase */

export const actions: ActionTree<EventState, State> = {
  async getAtndEvents(
    { commit }: ActionContext<EventState, State>,
    period: string
  ) {
    const events: {
      event: AtndEventResponse
    }[] = await this.$axios.$get(`/.netlify/functions/atnd?period=${period}`)

    commit(
      'events/setEvents',
      events
        .filter((e: { event: AtndEventResponse }) => e.event.limit >= 30)
        .map(
          (e: { event: AtndEventResponse }) =>
            ({
              title: e.event.title,
              catch: e.event.catch,
              description: e.event.description,
              eventUrl: e.event.event_url,
              startedAt: this.$moment(e.event.started_at).format(
                'YYYY-MM-DD HH:mm:ss (ddd)'
              ),
              endedAt: this.$moment(e.event.ended_at).format(
                'YYYY-MM-DD HH:mm:ss (ddd)'
              ),
              address: `${e.event.address} ${e.event.place}`
            } as EventState)
        ),
      { root: true }
    )
  }
}
