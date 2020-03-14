import axios, { AxiosResponse } from 'axios'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { AtndEventResponse, AtndResponse } from '@/store/atnd'

export async function handler(event: APIGatewayProxyEvent) {
  const ymd = (event.queryStringParameters || { period: '' }).period
  const count = 100
  const getEvents = (
    events: { event: AtndEventResponse }[] = [],
    start: number = 1
  ): Promise<{ event: AtndEventResponse }[]> =>
    axios
      .get('http://api.atnd.org/events', {
        params: { ymd, start, count, format: 'json' }
      })
      .then((res: AxiosResponse<AtndResponse>) =>
        res.data.results_returned === count
          ? getEvents([...events, ...res.data.events], start + count)
          : [...events, ...res.data.events]
      )

  const events: { event: AtndEventResponse }[] = await getEvents()

  return {
    statusCode: 200,
    body: JSON.stringify(events)
  }
}
