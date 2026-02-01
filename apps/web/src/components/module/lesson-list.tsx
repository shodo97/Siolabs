'use client';

import Link from 'next/link';
import { CheckCircle2, Circle, PlayCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import type { LessonSummary } from '@/types';

interface LessonListProps {
  lessons: LessonSummary[];
  courseId: string;
  moduleId: string;
}

export function LessonList({ lessons, courseId, moduleId }: LessonListProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
        <h2 className="font-semibold text-gray-900">Lessons</h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {lessons.map((lesson, index) => (
          <li key={lesson.id}>
            <Link
              href={ROUTES.LESSON(courseId, moduleId, lesson.id)}
              className={cn(
                'flex items-center gap-4 px-4 py-4 transition hover:bg-gray-50',
                lesson.isCurrent && 'bg-brand-50 hover:bg-brand-50/80'
              )}
            >
              {/* Order number */}
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium',
                  lesson.isCompleted && 'bg-emerald-100 text-emerald-700',
                  lesson.isCurrent && 'bg-brand-100 text-brand-700',
                  !lesson.isCompleted && !lesson.isCurrent && 'bg-gray-100 text-gray-500'
                )}
              >
                {lesson.isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : lesson.isCurrent ? (
                  <PlayCircle className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    'font-medium truncate',
                    lesson.isCompleted && 'text-gray-500',
                    lesson.isCurrent && 'text-brand-700',
                    !lesson.isCompleted && !lesson.isCurrent && 'text-gray-900'
                  )}
                >
                  {lesson.title}
                </p>
                {lesson.isCurrent && (
                  <p className="text-xs text-brand-600 mt-0.5">
                    Continue from here
                  </p>
                )}
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{lesson.durationMinutes} min</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
