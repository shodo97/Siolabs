'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { CourseWithProgress } from '@/types';
import { ROUTES } from '@/lib/constants';

interface ContinueLearningCTAProps {
  course: CourseWithProgress;
}

export function ContinueLearningCTA({ course }: ContinueLearningCTAProps) {
  const lessonUrl = course.currentLesson
    ? ROUTES.LESSON(
        course.id,
        course.currentLesson.moduleId,
        course.currentLesson.id
      )
    : ROUTES.COURSE(course.id);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 p-6 text-white shadow-xl lg:p-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/20" />
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left content */}
        <div className="flex flex-1 items-start gap-4 lg:items-center">
          {/* Course thumbnail */}
          {course.thumbnailUrl && (
            <div className="hidden shrink-0 overflow-hidden rounded-xl sm:block">
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                width={120}
                height={80}
                className="h-20 w-30 object-cover"
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Continue Learning
            </p>
            <h2 className="mt-1 truncate text-xl font-bold lg:text-2xl">
              {course.title}
            </h2>
            {course.currentLesson && (
              <p className="mt-1 truncate text-sm text-white/80">
                {course.currentLesson.moduleTitle} •{' '}
                {course.currentLesson.title}
              </p>
            )}

            {/* Progress bar */}
            <div className="mt-4 max-w-xs">
              <Progress
                value={course.progress}
                className="h-2 bg-white/20"
                indicatorClassName="bg-white"
              />
              <p className="mt-1.5 text-xs text-white/70">
                {course.progress}% complete • {course.completedLessons}/
                {course.totalLessons} lessons
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex shrink-0">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-white font-semibold text-brand-600 shadow-lg transition hover:bg-gray-50 hover:text-brand-700"
          >
            <Link href={lessonUrl}>
              <Play className="h-4 w-4" />
              Resume
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ContinueLearningCTASkeleton() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 p-6 lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Skeleton className="hidden h-20 w-30 rounded-xl bg-white/20 sm:block" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-3 w-24 bg-white/20" />
            <Skeleton className="h-6 w-48 bg-white/20" />
            <Skeleton className="h-4 w-64 bg-white/20" />
            <Skeleton className="mt-2 h-2 w-48 bg-white/20" />
          </div>
        </div>
        <Skeleton className="h-11 w-32 rounded-lg bg-white/20" />
      </div>
    </div>
  );
}
