const { z } = require("zod");

const createNewsSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  publishedAt: z.string().datetime().optional(),
  views: z.number().int().min(0).optional(),
});

const updateNewsSchema = createNewsSchema.partial();

module.exports = { createNewsSchema, updateNewsSchema };