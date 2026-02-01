'use client';

import { Calendar, Clock, Video, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { UpcomingSession } from '@/types';
import { format, isToday, isTomorrow, differenceInMinutes } from 'date-fns';

interface SessionCardProps {
  session: UpcomingSession;
}

export function SessionCard({ session }: SessionCardProps) {
  const sessionDate = new Date(session.scheduledAt);
  const isLive = session.status === 'LIVE';
  const minutesUntil = differenceInMinutes(sessionDate, new Date());
  const isStartingSoon = minutesUntil > 0 && minutesUntil <= 30;

  const getDateLabel = () => {
    if (isToday(sessionDate)) {
      return `Today, ${format(sessionDate, 'h:mm a')}`;
    }
    if (isTomorrow(sessionDate)) {
      return `Tomorrow, ${format(sessionDate, 'h:mm a')}`;
    }
    return format(sessionDate, 'MMM d, h:mm a');
  };

  return (
    <div
      className={cn(
        'rounded-lg border bg-white p-4 transition-all',
        isLive && 'border-red-200 bg-red-50 ring-2 ring-red-500/20',
        isStartingSoon && !isLive && 'border-amber-200 bg-amber-50'
      )}
    >
      {/* Status badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-medium">
          <Calendar className="h-3.5 w-3.5 text-brand-500" />
          <span className={cn(
            'text-gray-600',
            isLive && 'text-red-600',
            isStartingSoon && !isLive && 'text-amber-600'
          )}>
            {isLive ? 'Live Now' : getDateLabel()}
          </span>
        </div>
        
        {isLive && (
          <Badge variant="destructive" className="animate-pulse gap-1 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            LIVE
          </Badge>
        )}
        {isStartingSoon && !isLive && (
          <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
            Starting soon
          </Badge>
        )}
      </div>

      {/* Title */}
      <h4 className="mt-2 font-medium text-gray-900 line-clamp-2">
        {session.title}
      </h4>

      {/* Context */}
      <p className="mt-1 text-sm text-gray-500 line-clamp-1">
        {session.moduleTitle ? `${session.moduleTitle} • ` : ''}
        {session.courseTitle}
      </p>

      {/* Duration */}
      <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
        <Clock className="h-3 w-3" />
        <span>{session.durationMinutes} min</span>
      </div>

      {/* Join button */}
      {(isLive || isStartingSoon) && session.joinUrl && (
        <Button
          asChild
          size="sm"
          className={cn(
            'mt-3 w-full gap-2',
            isLive && 'bg-red-500 hover:bg-red-600'
          )}
        >
          <a href={session.joinUrl} target="_blank" rel="noopener noreferrer">
            <Video className="h-4 w-4" />
            {isLive ? 'Join Now' : 'Join Session'}
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      )}
    </div>
  );
}

export function SessionCardSkeleton() {
  return (
    <div className="rounded-lg border bg-white p-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-2 h-5 w-full" />
      <Skeleton className="mt-1 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-16" />
    </div>
  );
}
