import {z} from "@hono/zod-openapi"

const UserSchema = z.object({
    name : z.string().min(1).max(10).openapi({
      example: "John"
    }),
  
    age: z.number().min(1).max(10).openapi({
      example: 12
    }),
    id: z.string().min(1).max(10).openapi({
      example: "24"
    })
    
  })
  