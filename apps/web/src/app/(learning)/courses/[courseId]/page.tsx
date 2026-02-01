'use client';

import { use } from 'react';
import { useCourse } from '@/hooks';
import { Breadcrumb } from '@/components/shared';
import { CourseHeader, ModuleAccordion } from '@/components/course';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/lib/constants';

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default function CoursePage({ params }: CoursePageProps) {
  const { courseId } = use(params);
  const { data: course, isLoading, error } = useCourse(courseId);

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

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'My Courses', href: '/courses' },
          { label: course.title },
        ]}
      />

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
            />
          ))}
        </div>
      </section>
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
