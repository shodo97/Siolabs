'use client';

import { useEnrolledCourses } from '@/hooks';
import { CourseCard, CourseCardSkeleton } from '@/components/dashboard';
import { EmptyState } from '@/components/shared';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CoursesPage() {
  const { data: courses, isLoading, error } = useEnrolledCourses();

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">
            Unable to load courses
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="mt-1 text-gray-600">
          Continue learning and track your progress
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : courses && courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BookOpen className="h-6 w-6 text-gray-400" />}
          title="No courses yet"
          description="You haven't enrolled in any courses. Start learning today!"
          action={
            <Button>Browse Courses</Button>
          }
        />
      )}
    </div>
  );
}
