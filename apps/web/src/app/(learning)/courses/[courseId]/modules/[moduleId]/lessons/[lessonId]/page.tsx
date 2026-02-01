'use client';

import { use, useState, useCallback } from 'react';
import { useLesson, useUpdateVideoProgress } from '@/hooks';
import { Breadcrumb } from '@/components/shared';
import {
  VideoPlayer,
  LessonHeader,
  ResourcesList,
  MarkCompleteButton,
  LessonNavigation,
} from '@/components/lesson';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/lib/constants';
import { Lightbulb } from 'lucide-react';

interface LessonPageProps {
  params: Promise<{ courseId: string; moduleId: string; lessonId: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { courseId, moduleId, lessonId } = use(params);
  const { data: lesson, isLoading, error } = useLesson(lessonId);
  const { mutate: saveProgress } = useUpdateVideoProgress();
  const [canComplete, setCanComplete] = useState(false);

  // Handle video progress save
  const handleVideoProgress = useCallback(
    (positionSeconds: number) => {
      saveProgress({ lessonId, positionSeconds });
    },
    [lessonId, saveProgress]
  );

  // Handle when user has watched enough
  const handleWatchedEnough = useCallback(() => {
    setCanComplete(true);
  }, []);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">
            Unable to load lesson
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {error instanceof Error ? error.message : 'Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !lesson) {
    return <LessonPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: lesson.module.courseTitle, href: ROUTES.COURSE(courseId) },
          { label: lesson.module.title, href: ROUTES.MODULE(courseId, moduleId) },
          { label: lesson.title },
        ]}
      />

      {/* Video Player */}
      <div className="mx-auto max-w-4xl">
        <VideoPlayer
          url={lesson.videoUrl}
          initialPosition={lesson.videoProgress}
          onProgress={handleVideoProgress}
          onWatchedEnough={handleWatchedEnough}
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <LessonHeader lesson={lesson} />

        {/* Objective */}
        {lesson.objective && (
          <div className="flex gap-3 rounded-xl bg-brand-50 p-4">
            <Lightbulb className="h-5 w-5 shrink-0 text-brand-600" />
            <div>
              <p className="font-medium text-brand-900">Learning Objective</p>
              <p className="mt-1 text-sm text-brand-700">{lesson.objective}</p>
            </div>
          </div>
        )}

        {/* Description */}
        {lesson.description && (
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="font-semibold text-gray-900">About this lesson</h3>
            <p className="mt-2 text-gray-600">{lesson.description}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4">
          <div>
            <p className="text-sm text-gray-500">
              {lesson.isCompleted
                ? 'You\'ve completed this lesson'
                : canComplete
                ? 'Ready to mark as complete'
                : 'Watch at least 80% to mark complete'}
            </p>
          </div>
          <MarkCompleteButton
            lessonId={lesson.id}
            isCompleted={lesson.isCompleted}
            canComplete={canComplete || lesson.isCompleted}
          />
        </div>

        {/* Resources */}
        <ResourcesList resources={lesson.resources} />

        {/* Navigation */}
        <LessonNavigation
          courseId={courseId}
          prevLesson={lesson.prevLesson}
          nextLesson={lesson.nextLesson}
        />
      </div>
    </div>
  );
}

function LessonPageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-5 w-80" />
      <div className="mx-auto max-w-4xl">
        <Skeleton className="aspect-video rounded-xl" />
      </div>
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-3 h-8 w-3/4" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </div>
    </div>
  );
}
