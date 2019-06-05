export interface IEventState {
  title: string
  eventUrl: string
  startedAt: string
  endedAt: string
  address: string
}

export interface IEventsState {
  events: IEventState[]
}

export const state: IEventsState = {
  events: []
}

export const mutations = {
  setEvents(state: IEventsState, events: IEventState[]) {
    state.events = events
  }
}
