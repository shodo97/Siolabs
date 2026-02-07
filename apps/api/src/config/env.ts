import { z } from 'zod';

// ===========================================
// Environment Variable Schema
// ===========================================
const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),

  // Database
  DATABASE_URL: z
    .string({
      required_error: 'DATABASE_URL is required. Example: postgresql://user:pass@localhost:5432/siolabs',
    })
    .url('DATABASE_URL must be a valid URL'),

  // Redis (optional)
  REDIS_URL: z.string().url().optional(),

  // JWT Authentication
  JWT_SECRET: z
    .string({
      required_error: 'JWT_SECRET is required. Generate with: openssl rand -base64 32',
    })
    .min(32, 'JWT_SECRET must be at least 32 characters for security'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

// ===========================================
// Validation & Export
// ===========================================
function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('\n');
    console.error('╔══════════════════════════════════════════════════════════╗');
    console.error('║         ❌ ENVIRONMENT CONFIGURATION ERROR               ║');
    console.error('╚══════════════════════════════════════════════════════════╝');
    console.error('\nMissing or invalid environment variables:\n');

    const errors = parsed.error.flatten();

    // Show field-specific errors
    Object.entries(errors.fieldErrors).forEach(([field, messages]) => {
      console.error(`  • ${field}:`);
      messages?.forEach((msg) => console.error(`      ${msg}`));
    });

    console.error('\n📋 Quick fix:');
    console.error('   1. Copy .env.example to .env: cp .env.example .env');
    console.error('   2. Fill in the required values');
    console.error('   3. Restart the server\n');

    process.exit(1);
  }

  return parsed.data;
}

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;

// ===========================================
// Helper Functions
// ===========================================

/**
 * Check if running in production
 */
export const isProduction = () => env.NODE_ENV === 'production';

/**
 * Check if running in development
 */
export const isDevelopment = () => env.NODE_ENV === 'development';

/**
 * Check if running in test
 */
export const isTest = () => env.NODE_ENV === 'test';

/**
 * Get CORS origins as an array (supports comma-separated values)
 * Removes trailing slashes automatically
 */
export const getCorsOrigins = (): string | string[] => {
  const origins = env.CORS_ORIGIN.split(',')
    .map((o) => o.trim())
    .map((o) => o.replace(/\/+$/, '')); // Remove trailing slashes
  
  return origins.length === 1 ? origins[0] : origins;
};
