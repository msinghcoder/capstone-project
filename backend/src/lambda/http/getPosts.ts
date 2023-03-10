import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getPostsForUser } from '../../businessLogic/posts'
import { getUserId } from '../utils';

//  Get all Posts items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    const posts = await getPostsForUser(userId)

    return {
        statusCode: 200,
        body: JSON.stringify({
            items: posts
        })
    }

  })
  
handler.use(
  cors({
    credentials: true
  })
)
