'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const DEMO_EMAIL = 'student@siolabs.com';
const DEMO_PASSWORD = 'Password123!';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      // redirect happens in auth provider
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-slate-700"
        >
          <span className="text-xl font-bold">SioLabs</span>
        </Link>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Use your SioLabs account or the demo credentials below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div
                  className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                  role="alert"
                >
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  autoComplete="current-password"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Demo: {DEMO_EMAIL} / {DEMO_PASSWORD.replace(/./g, '•')}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in…' : 'Sign in'}
              </Button>
              <Link
                href="/"
                className="text-center text-sm text-muted-foreground underline hover:text-foreground"
              >
                Back to home
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
