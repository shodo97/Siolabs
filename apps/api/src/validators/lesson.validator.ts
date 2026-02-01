import { z } from 'zod';

export const videoProgressSchema = z.object({
  positionSeconds: z
    .number()
    .int('Position must be an integer')
    .min(0, 'Position cannot be negative'),
});

export type VideoProgressInput = z.infer<typeof videoProgressSchema>;
