import {z} from 'zod';

export const AuthSchema = z.object({
  username:z.string().trim().min(5, "username must be at least 5 characters long"),
  password: z.string().min(8, "password must be at least 8 characters long")
  .regex(/.*\d.*/, 'Password must contain at least one number')
})
export type IAdminReq = z.infer<typeof AuthSchema>
