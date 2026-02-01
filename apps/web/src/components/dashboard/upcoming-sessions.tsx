'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { SessionCard, SessionCardSkeleton } from './session-card';
import { Button } from '@/components/ui/button';
import type { UpcomingSession } from '@/types';

interface UpcomingSessionsProps {
  sessions: UpcomingSession[];
  isLoading?: boolean;
}

export function UpcomingSessions({ sessions, isLoading }: UpcomingSessionsProps) {
  if (isLoading) {
    return (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Upcoming Sessions
        </h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <SessionCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (sessions.length === 0) {
    return (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Upcoming Sessions
        </h2>
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-3 text-sm text-gray-500">
            No sessions scheduled this week
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Upcoming Sessions
        </h2>
        {sessions.length > 3 && (
          <Button variant="ghost" size="sm" asChild className="gap-1 text-brand-600">
            <Link href="/sessions">
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {sessions.slice(0, 5).map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </section>
  );
}
