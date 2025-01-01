import { z } from "zod";
import jalaali from "jalaali-js";

export const AuthSchema = z.object({
  username: z.string().trim().min(5, "نام کاربری حداقل باید 5 کاراکتر باشد"),
  password: z
    .string()
    .min(8, "پسورد باید حداقل 8 کاراکتر باشد")
    .regex(/.*\d.*/, "پسورد باید شامل حداقل یک عدد باشد"),
});

export const SignupSchema = z
  .object({
    firstname: z.string().trim().min(5, "نام حداقل باید 5 کاراکتر باشد"),
    lastname: z.string().min(5, "نام خانوادگی باید حداقل 5 کاراکتر باشد"),
    username: z.string().min(5, "یوزرنیم باید حداقل 5 کاراکتر باشد"),
    phoneNumber: z
      .string()
      .regex(
        /^09\d{9}$/,
        "شماره موبایل باید با صفر و نه شروع شود و نباید بیشتر از 11 رقم باشد"
      ),
    address: z.string().min(8, "آدرس باید حداقل 8 کاراکتر باشد"),
    password: z
      .string()
      .min(8, "پسورد باید حداقل 8 کاراکتر باشد")
      .regex(/.*\d.*/, "پسورد باید شامل حداقل یک عدد باشد"),
    confirmPassword: z
      .string()
      .min(8, "پسورد باید حداقل 8 کاراکتر باشد")
      .regex(/.*\d.*/, "پسورد باید شامل حداقل یک عدد باشد"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "پسورد و تکرار آن باید یکسان باشند",
    path: ["confirmPassword"], // ارجاع به فیلد مشخص برای پیام خطا
  });



  export const paymentSchema = z.object({
    firstname: z.string().trim().min(3, "نام حداقل باید 3 کاراکتر باشد"),
    lastname: z.string().trim().min(5, "نام خانوادگی باید حداقل 5 کاراکتر باشد"),
    phoneNumber: z
      .string()
      .regex(
        /^09\d{9}$/,
        "شماره موبایل باید با صفر و نه شروع شود و نباید بیشتر از 11 رقم باشد"
      ),
    address: z.string().trim().min(8, "آدرس باید حداقل 8 کاراکتر باشد"),
    deliveryDate: z
      .string()
      .regex(
        /^\d{4}\/\d{2}\/\d{2}$/,
        "تاریخ باید در قالب صحیح شمسی (YYYY/MM/DD) باشد"
      )
      .refine((date) => {
        const [year, month, day] = date.split("/").map(Number);
        const isValidJalali = jalaali.isValidJalaaliDate(year, month, day);
        return isValidJalali;
      }, "تاریخ تحویل باید یک تاریخ معتبر شمسی باشد"),
  });

export type IUserLoginReq = z.infer<typeof AuthSchema>;
