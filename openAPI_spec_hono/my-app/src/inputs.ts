import { z } from "@hono/zod-openapi";

const ParamsSchema = z.object({
  id: z.string().min(3).max(10).openapi({
    params: {
      name: "id",
      in: "path",
    },
    example: "123",
  }),
});
