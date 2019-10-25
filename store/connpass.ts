import { ActionContext, ActionTree } from 'vuex'
import { IEventState } from '@/store/events'
import { IState } from '@/store/index'

export interface IConnpassEventResponse {
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

export interface IConnpassResponse {
  results_returned: number
  events: IConnpassEventResponse[]
}

export const actions: ActionTree<IEventState, IState> = {
  async getConnpassEvents(
    { commit }: ActionContext<IEventState, IState>,
    period: string
  ) {
    const events: IConnpassEventResponse[] = await this.$axios.$get(
      `/.netlify/functions/connpass?period=${period}`
    )

    commit(
      'events/setEvents',
      events
        .filter((e: IConnpassEventResponse) => e.limit >= 30)
        .map(
          (e: IConnpassEventResponse) =>
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
            } as IEventState)
        ),
      { root: true }
    )
  }
}
