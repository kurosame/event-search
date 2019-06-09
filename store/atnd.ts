import { IEventState } from '@/store/events'

export const actions = {
  async getAtndEvents({ commit }, period: string[]) {
    const count = 100
    const getEvents = (
      events: {}[] = [],
      start: number = 1
    ): { [key: string]: any }[] =>
      this.$axios
        .$get('/atnd', {
          params: {
            ymd: period.join(','),
            start,
            count,
            format: 'json'
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
        .filter(e => e.event.limit >= 30)
        .map(
          e =>
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
            } as IEventState)
        ),
      { root: true }
    )
  }
}
