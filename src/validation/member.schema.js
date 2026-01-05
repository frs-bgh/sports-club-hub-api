const { z } = require("zod");

const noDigits = (val) => !/[0-9]/.test(val);

const createMemberSchema = z.object({
  firstName: z.string().min(1).refine(noDigits, "firstName cannot contain numbers"),
  lastName: z.string().min(1),
  age: z.number().int().positive().optional(),
  membershipNumber: z.number().int().positive(),
});

const updateMemberSchema = createMemberSchema.partial();

module.exports = { createMemberSchema, updateMemberSchema };