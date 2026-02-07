'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { formatDuration } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import type { CourseDetails } from '@/types';

interface CourseHeaderProps {
  course: CourseDetails;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  // Find current lesson
  let currentLesson: { id: string; moduleId: string } | null = null;
  for (const courseModule of course.modules) {
    const lesson = courseModule.lessons.find((l) => l.isCurrent);
    if (lesson) {
      currentLesson = { id: lesson.id, moduleId: courseModule.id };
      break;
    }
  }

  const resumeUrl = currentLesson
    ? ROUTES.LESSON(course.id, currentLesson.moduleId, currentLesson.id)
    : null;

  const isComplete = course.progress === 100;

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
      <div className="p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Thumbnail */}
          {course.thumbnailUrl && (
            <div className="shrink-0 overflow-hidden rounded-xl">
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                width={200}
                height={133}
                className="h-[133px] w-[200px] object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1">
            {/* Status badge */}
            {isComplete && (
              <Badge variant="success" className="mb-2">
                ✓ Completed
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
              {course.title}
            </h1>

            {/* Description */}
            <p className="mt-2 text-gray-600 line-clamp-2">
              {course.description}
            </p>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {course.modules.length} modules
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {formatDuration(course.durationMinutes)}
              </span>
              {course.sessions.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {course.sessions.length} live sessions
                </span>
              )}
            </div>

            {/* Progress */}
            <div className="mt-6 max-w-md">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Course progress</span>
                <span className="font-medium text-gray-900">
                  {course.progress}%
                </span>
              </div>
              <Progress
                value={course.progress}
                className="mt-2 h-2"
                indicatorClassName={isComplete ? 'bg-emerald-500' : 'bg-brand-500'}
              />
              <p className="mt-1 text-xs text-gray-400">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </p>
            </div>

            {/* CTA */}
            {resumeUrl && !isComplete && (
              <Button asChild className="mt-6 gap-2">
                <Link href={resumeUrl}>
                  <Play className="h-4 w-4" />
                  Continue Learning
                </Link>
              </Button>
            )}
            {isComplete && (
              <Button variant="outline" asChild className="mt-6">
                <Link href={ROUTES.LESSON(course.id, course.modules[0]?.id, course.modules[0]?.lessons[0]?.id)}>
                  Review Course
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
