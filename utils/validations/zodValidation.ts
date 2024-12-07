import {z} from 'zod';

export const AuthSchema = z.object({
  username:z.string().trim().min(5, "نام کاربری حداقل باید 5 کاراکتر باشد"),
  password: z.string().min(8, "پسورد باید حداقل 8 کاراکتر باشد")
  .regex(/.*\d.*/, 'پسورد باید شامل حداقل یک عدد باشد')
})
export type IAdminReq = z.infer<typeof AuthSchema>
