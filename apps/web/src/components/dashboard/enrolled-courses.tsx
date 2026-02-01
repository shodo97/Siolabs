'use client';

import { BookOpen } from 'lucide-react';
import { CourseCard, CourseCardSkeleton } from './course-card';
import { Button } from '@/components/ui/button';
import type { CourseWithProgress } from '@/types';

interface EnrolledCoursesProps {
  courses: CourseWithProgress[];
  isLoading?: boolean;
}

export function EnrolledCourses({ courses, isLoading }: EnrolledCoursesProps) {
  if (isLoading) {
    return (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">My Courses</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">My Courses</h2>
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
            <BookOpen className="h-6 w-6 text-brand-600" />
          </div>
          <h3 className="mt-4 font-medium text-gray-900">
            No courses yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven&apos;t enrolled in any courses yet.
          </p>
          <Button className="mt-4" variant="outline">
            Browse Courses
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">My Courses</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
