import 'isomorphic-fetch'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getXataClient } from '../../../_lib/xata.codegen'
// import { XataRecord } from '@xata.io/client'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const id = String(request.query.id ?? '') // example: 'rec_cci5p8miqtgok3idj8b0'

  if (request.method !== 'GET') {
    throw {
      status: 405,
      message: 'Only `GET` requests',
    }
  }

  const xata = getXataClient()
  response.json(await xata.db.series.filter({ id }).getFirst())
}
