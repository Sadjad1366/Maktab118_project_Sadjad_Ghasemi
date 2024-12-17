import { z } from "zod";

export const addProductValidationSchema = z.object({
  category: z.string().min(3,"حداقل سه کاراکتر وارد کنید").trim(),
  subcategory: z.string().min(3,"حداقل سه کاراکتر وارد کنید").trim(),
  name: z.string().min(3,"حداقل سه کاراکتر وارد کنید").trim(),
  price: z.string().min(3,"حداقل سه کاراکتر وارد کنید"),
  quantity: z.string().min(3,"حداقل سه کاراکتر وارد کنید"),
  brand: z.string().min(3,"حداقل سه کاراکتر وارد کنید").trim(),
  description: z.string().min(3,"حداقل سه کاراکتر وارد کنید").trim(),
  images: z.array(
    z
      .instanceof(File) // Ensure each image is an instance of File
      .refine((file) => file.size > 0, "فیلد عکس نمیتواند خالی باشد") // Custom validation for file size
  ).min(1, "حداقل یک عکس لازم است"), // At least one image is required
});


export const updateProductValidationSchema = z.object({
      category: z.string().min(3,"حداقل سه کاراکتر وارد کنید").trim(),
      subcategory: z.string().min(3,"حداقل سه کاراکتر وارد کنید").trim(),
      name: z.string().min(3,"حداقل سه کاراکتر وارد کنید").trim(),
      price: z.string().min(3,"حداقل سه کاراکتر وارد کنید"),
      quantity: z.string().min(3,"حداقل سه کاراکتر وارد کنید"),
      brand: z.string().min(3,"حداقل سه کاراکتر وارد کنید").trim(),
      description: z.string().min(3,"حداقل سه کاراکتر وارد کنید").trim(),
      images: z.array(
        z
          .instanceof(File) // Ensure each image is an instance of File
          .refine((file) => file.size > 0, "فیلد عکس نمیتواند خالی باشد") // Custom validation for file size
      ).min(1, "حداقل یک عکس لازم است"), // At least one image is required
    });
    export type AddProductValidationSchema = z.infer<typeof addProductValidationSchema>;
    export type UpdateProductValidationSchema = z.infer<typeof updateProductValidationSchema>;
