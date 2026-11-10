import { z } from "zod";
export const entrySchema = z.object({
  type: z.enum(["universities", "countries"]),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1).max(200),
  status: z.enum(["draft", "published"]).default("draft"),
  data: z.record(z.string(), z.unknown()).default({}),
});
