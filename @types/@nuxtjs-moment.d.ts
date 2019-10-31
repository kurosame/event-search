import { Moment, MomentFormatSpecification, MomentInput } from 'moment'

declare module 'vue/types/vue' {
  interface Vue {
    $moment(
      input?: MomentInput,
      format?: MomentFormatSpecification,
      language?: string,
      strict?: boolean
    ): Moment
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $moment(
      input?: MomentInput,
      format?: MomentFormatSpecification,
      language?: string,
      strict?: boolean
    ): Moment
  }
}
