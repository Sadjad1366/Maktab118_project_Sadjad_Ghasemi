import Joi from 'joi';

const productSchema = Joi.object({
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  brand: Joi.string().required(),
  description: Joi.string().required(),
  thumbnail: Joi.any(), // اضافه کردن این خط
  images: Joi.any() // اضافه کردن این خط
});
