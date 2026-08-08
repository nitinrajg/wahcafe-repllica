import { z } from 'zod';

export const leadSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(8, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^[\d\s\-+()]+$/, 'Invalid phone number'),
  formType: z.enum(['customize-menu', 'contact']),
  sourcePath: z.string().optional(),
  // Honeypot — should be empty; if filled, we silently discard
  _hp: z.string().max(0).optional(),
  // Timestamp of when form was rendered — reject if <3 seconds ago
  _ts: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
