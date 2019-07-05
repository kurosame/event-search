import { IEventState } from '@/store/events'

export interface IAtndEventResponse {
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

export interface IAtndResponse {
  results_returned: number
  events: { event: IAtndEventResponse }[]
}

export const actions = {
  async getAtndEvents({ commit }, period: string) {
    const events: {
      event: IAtndEventResponse
    }[] = await (this as any).$axios.$get(
      `/.netlify/functions/atnd?period=${period}`
    )

    commit(
      'events/setEvents',
      events
        .filter((e: { event: IAtndEventResponse }) => e.event.limit >= 30)
        .map(
          (e: { event: IAtndEventResponse }) =>
            ({
              title: e.event.title,
              catch: e.event.catch,
              description: e.event.description,
              eventUrl: e.event.event_url,
              startedAt: (this as any)
                .$moment(e.event.started_at)
                .format('YYYY-MM-DD HH:mm:ss (ddd)'),
              endedAt: (this as any)
                .$moment(e.event.ended_at)
                .format('YYYY-MM-DD HH:mm:ss (ddd)'),
              address: `${e.event.address} ${e.event.place}`
            } as IEventState)
        ),
      { root: true }
    )
  }
}
