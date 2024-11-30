import { Hono } from 'hono'
import {createRoute, OpenAPIHono} from "@hono/zod-openapi"
import {ParamsSchema} from './inputs'                                                                                                                                                
import {UserSchema} from './outputs'
import { version } from 'hono/jsx'

const app = new Hono()

const getUserRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  request:{
    params: ParamsSchema

  },
  responses: {
    200:{
      content:{
        'application/json':{
          schema: UserSchema
        }

      },
      description: 'Get the users details'
    }
  }
})

app.openapi(getUserRoute, (c) =>{

  const {id} = c.req.valid('params');
  return c.json({
    id,
    name: "John",
    age : 20
  })
})

app.openapi(postUserRoute, (c) =>{

  const {id} = c.req.valid('params');
  return c.json({
    id,
    name: "John",
    age : 20
  })
})


app.doc('/doc', {
  Openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'MY API',
  }
});

export default app
                                                      