export interface EventState {
  title: string
  catch: string
  description: string
  eventUrl: string
  startedAt: string
  endedAt: string
  address: string
}

export interface EventsState {
  events: EventState[]
}

export const state: EventsState = {
  events: []
}

export const mutations = {
  setEvents(state: EventsState, events: EventState[]): void {
    state.events = [...state.events, ...events]
  }
}
