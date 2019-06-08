import { IEventState } from '@/store/events'

export const actions = {
  async getConnpassEvents({ commit }) {
    const count = 100
    const getEvents = (
      events: {}[] = [],
      start: number = 1
    ): { [key: string]: any }[] =>
      this.$axios
        .$get('/connpass', {
          params: {
            // keyword: '東京',
            ymd: '20190601',
            count,
            start
          }
        })
        .then(res =>
          res.results_returned === count
            ? getEvents([...events, ...res.events], start + count)
            : [...events, ...res.events]
        )
        .catch(err => console.error(err))

    const events = await getEvents()

    commit(
      'events/setEvents',
      events
        .filter(e => e.limit >= 30)
        .map(
          e =>
            ({
              title: e.title,
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
