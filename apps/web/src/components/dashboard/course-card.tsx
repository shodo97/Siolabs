'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDuration } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import type { CourseWithProgress } from '@/types';

interface CourseCardProps {
  course: CourseWithProgress;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={ROUTES.COURSE(course.id)}>
      <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-brand-500/20">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200">
              <BookOpen className="h-12 w-12 text-brand-400" />
            </div>
          )}
          
          {/* Progress overlay */}
          {course.progress === 100 && (
            <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/90">
              <div className="text-center text-white">
                <div className="text-3xl font-bold">✓</div>
                <p className="text-sm font-medium">Completed</p>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="line-clamp-2 font-semibold text-gray-900 group-hover:text-brand-600">
            {course.title}
          </h3>

          {/* Meta info */}
          <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {course.moduleCount} modules
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(course.durationMinutes)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <Progress
              value={course.progress}
              className="h-1.5"
              indicatorClassName={
                course.progress === 100 ? 'bg-emerald-500' : 'bg-brand-500'
              }
            />
            <div className="mt-1.5 flex items-center justify-between text-xs text-gray-400">
              <span>
                {course.completedLessons}/{course.totalLessons} lessons
              </span>
              <span className="font-medium">
                {course.progress}%
              </span>
            </div>
          </div>

          {/* Last activity */}
          {course.lastAccessedAt && (
            <p className="mt-3 text-xs text-gray-400">
              Last activity:{' '}
              {new Date(course.lastAccessedAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
              })}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video" />
      <CardContent className="p-4">
        <Skeleton className="h-5 w-3/4" />
        <div className="mt-2 flex gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-1.5 w-full" />
          <div className="mt-1.5 flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
