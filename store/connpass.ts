import { IEventState } from '@/store/event'

export const actions = {
  async getConnpassEvents({ commit }) {
    const res = await this.$axios.$get('/connpass', {
      params: {
        keyword: 'python'
      }
    })
    commit(
      'event/setEvents',
      res.events.map(
        e =>
          ({
            title: e.title,
            eventUrl: e.event_url,
            startedAt: e.started_at,
            endedAt: e.ended_at,
            address: e.address
          } as IEventState)
      ),
      { root: true }
    )
  }
}
