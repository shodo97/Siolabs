'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  CheckCircle2,
  Circle,
  PlayCircle,
  Lock,
  FileText,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ROUTES } from '@/lib/constants';
import type { ModuleWithLessons, LessonSummary, LiveSessionSummary } from '@/types';
import { format } from 'date-fns';

interface ModuleAccordionProps {
  module: ModuleWithLessons;
  courseId: string;
  defaultOpen?: boolean;
}

export function ModuleAccordion({
  module,
  courseId,
  defaultOpen = false,
}: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isComplete = module.progress === 100;
  const hasCurrentLesson = module.lessons.some((l) => l.isCurrent);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border transition-colors',
        isComplete && 'border-emerald-200 bg-emerald-50/30',
        hasCurrentLesson && !isComplete && 'border-brand-200 bg-brand-50/30',
        !isComplete && !hasCurrentLesson && 'border-gray-200 bg-white'
      )}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-gray-50/50"
      >
        {/* Status icon */}
        <div className="shrink-0">
          {isComplete ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          ) : hasCurrentLesson ? (
            <PlayCircle className="h-6 w-6 text-brand-500" />
          ) : (
            <Circle className="h-6 w-6 text-gray-300" />
          )}
        </div>

        {/* Title and meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {module.title}
            </h3>
            {hasCurrentLesson && !isComplete && (
              <Badge variant="info" className="text-xs">Current</Badge>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
            <span>{module.lessons.length} lessons</span>
            <span>•</span>
            <span>{module.completedLessons} completed</span>
          </div>
        </div>

        {/* Progress */}
        <div className="hidden sm:block w-24">
          <Progress
            value={module.progress}
            className="h-1.5"
            indicatorClassName={isComplete ? 'bg-emerald-500' : 'bg-brand-500'}
          />
          <p className="mt-1 text-xs text-gray-400 text-right">
            {module.progress}%
          </p>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            'h-5 w-5 text-gray-400 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white/50">
          {/* Objective */}
          {module.objective && (
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Objective:</span> {module.objective}
              </p>
            </div>
          )}

          {/* Lessons */}
          <ul className="divide-y divide-gray-100">
            {module.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                courseId={courseId}
                moduleId={module.id}
              />
            ))}
          </ul>

          {/* Assignment */}
          {module.assignment && (
            <div className="border-t border-gray-100 p-4">
              <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-3">
                <FileText className="h-5 w-5 text-amber-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {module.assignment.title}
                  </p>
                  {module.assignment.dueDate && (
                    <p className="text-sm text-gray-500">
                      Due: {format(new Date(module.assignment.dueDate), 'MMM d, yyyy')}
                    </p>
                  )}
                </div>
                <Badge variant={module.assignment.isSubmitted ? 'success' : 'warning'}>
                  {module.assignment.isSubmitted ? 'Submitted' : 'Pending'}
                </Badge>
              </div>
            </div>
          )}

          {/* Sessions */}
          {module.sessions.length > 0 && (
            <div className="border-t border-gray-100 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                Live Sessions
              </p>
              <div className="space-y-2">
                {module.sessions.map((session) => (
                  <SessionItem key={session.id} session={session} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface LessonItemProps {
  lesson: LessonSummary;
  courseId: string;
  moduleId: string;
}

function LessonItem({ lesson, courseId, moduleId }: LessonItemProps) {
  return (
    <li>
      <Link
        href={ROUTES.LESSON(courseId, moduleId, lesson.id)}
        className={cn(
          'flex items-center gap-3 px-4 py-3 transition hover:bg-gray-50',
          lesson.isCurrent && 'bg-brand-50'
        )}
      >
        {/* Status */}
        {lesson.isCompleted ? (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
        ) : lesson.isCurrent ? (
          <PlayCircle className="h-5 w-5 shrink-0 text-brand-500" />
        ) : (
          <Circle className="h-5 w-5 shrink-0 text-gray-300" />
        )}

        {/* Title */}
        <span
          className={cn(
            'flex-1 truncate text-sm',
            lesson.isCompleted && 'text-gray-500',
            lesson.isCurrent && 'font-medium text-brand-700',
            !lesson.isCompleted && !lesson.isCurrent && 'text-gray-700'
          )}
        >
          {lesson.title}
        </span>

        {/* Duration */}
        <span className="shrink-0 text-xs text-gray-400">
          {lesson.durationMinutes} min
        </span>
      </Link>
    </li>
  );
}

interface SessionItemProps {
  session: LiveSessionSummary;
}

function SessionItem({ session }: SessionItemProps) {
  const sessionDate = new Date(session.scheduledAt);
  const isLive = session.status === 'LIVE';
  const isCompleted = session.status === 'COMPLETED';

  return (
    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
      <Video className={cn(
        'h-5 w-5',
        isLive && 'text-red-500',
        isCompleted && 'text-gray-400',
        !isLive && !isCompleted && 'text-brand-500'
      )} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {session.title}
        </p>
        <p className="text-xs text-gray-500">
          {format(sessionDate, 'MMM d, h:mm a')}
        </p>
      </div>
      {isLive && session.joinUrl && (
        <a
          href={session.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-red-600 hover:underline"
        >
          Join Now
        </a>
      )}
      {isCompleted && session.recordingUrl && (
        <a
          href={session.recordingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-brand-600 hover:underline"
        >
          Watch Recording
        </a>
      )}
    </div>
  );
}
