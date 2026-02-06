'use client';

import { useEffect, useState } from 'react';
import { useCourse } from '@/hooks';
import { Breadcrumb } from '@/components/shared';
import { CourseHeader, ModuleAccordion } from '@/components/course';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/lib/constants';
import { LessonPlayerPanel } from '@/components/learning/lesson-player-panel';
import type { LessonSummary } from '@/types';

interface CoursePageProps {
  params: { courseId: string };
}

export default function CoursePage({ params }: CoursePageProps) {
  const { courseId } = params;
  const { data: course, isLoading, error } = useCourse(courseId);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Determine default lesson: first incomplete, otherwise first lesson of first module
  useEffect(() => {
    if (!course || selectedLessonId) return;

    const allModules = course.modules;
    let defaultLesson: { id: string } | null = null;

    // Prefer first incomplete lesson
    for (const module of allModules) {
      const incomplete = module.lessons.find((l) => !l.isCompleted);
      if (incomplete) {
        defaultLesson = { id: incomplete.id };
        break;
      }
    }

    // Fallback: very first lesson
    if (!defaultLesson) {
      const firstModuleWithLessons = allModules.find((m) => m.lessons.length > 0);
      if (firstModuleWithLessons) {
        defaultLesson = { id: firstModuleWithLessons.lessons[0].id };
      }
    }

    setSelectedLessonId(defaultLesson?.id ?? null);
  }, [course, selectedLessonId]);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">
            Unable to load course
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {error instanceof Error ? error.message : 'Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !course) {
    return <CoursePageSkeleton />;
  }

  // Find the module with the current lesson for default open state
  const currentModuleIndex = course.modules.findIndex((m) =>
    m.lessons.some((l) => l.isCurrent)
  );

  const handleLessonSelect = (lesson: LessonSummary & { moduleId: string; courseId: string }) => {
    setSelectedLessonId(lesson.id);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'My Courses', href: ROUTES.COURSES },
          { label: course.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
        {/* Left: course content */}
        <div className="space-y-6">
          {/* Course Header */}
          <CourseHeader course={course} />

          {/* Modules Section */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Course Content
            </h2>
            <div className="space-y-3">
              {course.modules.map((module, index) => (
                <ModuleAccordion
                  key={module.id}
                  module={module}
                  courseId={course.id}
                  defaultOpen={index === currentModuleIndex || index === 0}
                  onLessonSelect={handleLessonSelect}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right: lesson player */}
        <div className="lg:self-start">
          <LessonPlayerPanel lessonId={selectedLessonId} />
        </div>
      </div>
    </div>
  );
}

function CoursePageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-5 w-48" />
      
      {/* Header skeleton */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <Skeleton className="h-[133px] w-[200px] rounded-xl" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-2 w-64" />
          </div>
        </div>
      </div>

      {/* Modules skeleton */}
      <div>
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
