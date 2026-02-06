'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth, useLesson, useUpdateVideoProgress } from '@/hooks';
import { VideoPlayer, LessonHeader, ResourcesList, MarkCompleteButton } from '@/components/lesson';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface LessonPlayerPanelProps {
  lessonId: string | null;
}

export function LessonPlayerPanel({ lessonId }: LessonPlayerPanelProps) {
  const { isAuthenticated } = useAuth();
  const enabled = !!lessonId;
  const { data: lesson, isLoading, error } = useLesson(lessonId ?? '');
  const { mutate: saveProgress } = useUpdateVideoProgress();
  const [canComplete, setCanComplete] = useState(false);
  const lastPositionRef = useRef(0);

  // Reset completion flag when lesson changes
  useEffect(() => {
    setCanComplete(false);
    lastPositionRef.current = 0;
  }, [lessonId]);

  // Final save on unmount / lesson change
  useEffect(() => {
    if (!lessonId) return;
    return () => {
      if (lastPositionRef.current > 0) {
        saveProgress({ lessonId, positionSeconds: lastPositionRef.current });
      }
    };
  }, [lessonId, saveProgress]);

  if (!enabled) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle>Lesson player</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Select a lesson from the course content to start watching.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Handle auth errors (e.g. 401 from API)
  const status = (error as any)?.status as number | undefined;
  if (error && status === 401) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle>Sign in to view lessons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            You need to be signed in to watch lessons and track your progress.
          </p>
          <Button asChild>
            <Link href="/login">Go to login</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || !lesson) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle>Loading lesson...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  const handleProgress = (positionSeconds: number) => {
    if (!lessonId || !isAuthenticated) return;
    lastPositionRef.current = positionSeconds;
    saveProgress({ lessonId, positionSeconds });
  };

  const handleWatchedEnough = () => {
    setCanComplete(true);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900">
          {lesson.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video player */}
        <VideoPlayer
          url={lesson.videoUrl}
          initialPosition={lesson.videoProgress ?? 0}
          onProgress={handleProgress}
          onWatchedEnough={handleWatchedEnough}
        />

        {/* Objective / description */}
        {(lesson.objective || lesson.description) && (
          <LessonHeader lesson={lesson} />
        )}

        {/* Resources */}
        {lesson.resources.length > 0 && (
          <ResourcesList resources={lesson.resources} />
        )}

        {/* Mark complete */}
        {isAuthenticated && (
          <div className="pt-2">
            <MarkCompleteButton
              lessonId={lesson.id}
              isCompleted={lesson.isCompleted}
              canComplete={canComplete || lesson.isCompleted}
            />
          </div>
        )}
        {!isAuthenticated && (
          <p className="text-xs text-gray-500">
            <Link href="/login" className="underline">
              Sign in
            </Link>{' '}
            to mark lessons complete and track your progress.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

