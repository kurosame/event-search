import { IAtndEventResponse, IAtndResponse } from '@/store/atnd'
import axios, { AxiosResponse } from 'axios'
import { APIGatewayProxyEvent } from 'aws-lambda'

export async function handler(event: APIGatewayProxyEvent) {
  const ymd = (event.queryStringParameters || { period: '' }).period
  const count = 100
  const getEvents = (
    events: { event: IAtndEventResponse }[] = [],
    start: number = 1
  ): Promise<{ event: IAtndEventResponse }[]> =>
    axios
      .get('http://api.atnd.org/events', {
        params: { ymd, start, count, format: 'json' }
      })
      .then((res: AxiosResponse<IAtndResponse>) =>
        res.data.results_returned === count
          ? getEvents([...events, ...res.data.events], start + count)
          : [...events, ...res.data.events]
      )

  const events: { event: IAtndEventResponse }[] = await getEvents()

  return {
    statusCode: 200,
    body: JSON.stringify(events)
  }
}
