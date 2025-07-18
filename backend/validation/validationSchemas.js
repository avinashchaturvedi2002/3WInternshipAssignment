import {z}  from "zod"

const createUserSchema=z.object({
  name:z.string().trim().min(1,"Name cannot be empty").max(50,"Name cannot exceed 50 characters")
})

const claimPointSchema=z.object({
  userId:z.string().trim().min(1,"userId cannot be empty").refine(val => /^[0-9a-fA-F]{24}$/.test(val), "Invalid User ID format")
})

const paginationSchema = z.object({
  page: z.string().optional().default('1').transform(Number).pipe(z.number().int().min(1, "Page must be at least 1")),
  pageSize: z.string().optional().default('10').transform(Number).pipe(z.number().int().min(1, "Page size must be at least 1").max(100, "Page size cannot exceed 100")),
  userId: z.string().trim().optional()
    .refine(val => !val || /^[0-9a-fA-F]{24}$/.test(val), "Invalid User ID format"), 
});

export {createUserSchema,claimPointSchema,paginationSchema}