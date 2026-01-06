import { z } from 'zod';

export const productSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must not exceed 100 characters')
    .trim()
    .refine((val) => val.length > 0, 'Title is required'),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive('Price must be greater than 0')
    .max(1000000, 'Price must not exceed $1,000,000')
    .refine((val) => val > 0, 'Price must be greater than 0'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(1000, 'Description must not exceed 1000 characters')
    .trim()
    .refine((val) => val.length > 0, 'Description is required'),
  image: z
    .string()
    .min(1, 'Please select an image')
    .refine((val) => val && val.length > 0, 'Image is required'),
  category: z
    .string()
    .min(1, 'Category is required')
    .refine(
      (val) => ["men's clothing", "women's clothing", "electronics", "jewelery"].includes(val),
      'Please select a valid category'
    ),
});

