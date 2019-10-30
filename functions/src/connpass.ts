import axios, { AxiosResponse } from 'axios'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { IConnpassEventResponse, IConnpassResponse } from '@/store/connpass'

export async function handler(event: APIGatewayProxyEvent) {
  const ymd = (event.queryStringParameters || { period: '' }).period
  const count = 100
  const getEvents = (
    events: IConnpassEventResponse[] = [],
    start: number = 1
  ): Promise<IConnpassEventResponse[]> =>
    axios
      .get('https://connpass.com/api/v1/event', {
        params: { ymd, start, count }
      })
      .then((res: AxiosResponse<IConnpassResponse>) =>
        res.data.results_returned === count
          ? getEvents([...events, ...res.data.events], start + count)
          : [...events, ...res.data.events]
      )

  const events: IConnpassEventResponse[] = await getEvents()

  return {
    statusCode: 200,
    body: JSON.stringify(events)
  }
}
