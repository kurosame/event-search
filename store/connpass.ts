import { IEventState } from '@/store/events'

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

export const actions = {
  async getConnpassEvents({ commit }, period: string) {
    const events: IConnpassEventResponse[] = await (this as any).$axios.$get(
      `/connpass?period=${period}`,
      { baseURL: process.env.BASE_URL || 'http://localhost:3000' }
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
              startedAt: (this as any)
                .$moment(e.started_at)
                .format('YYYY-MM-DD HH:mm:ss (ddd)'),
              endedAt: (this as any)
                .$moment(e.ended_at)
                .format('YYYY-MM-DD HH:mm:ss (ddd)'),
              address: `${e.address} ${e.place}`
            } as IEventState)
        ),
      { root: true }
    )
  }
}
