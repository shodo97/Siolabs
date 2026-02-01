'use client';

import { useAuth } from '@/hooks';
import { useDashboard } from '@/hooks/use-dashboard';
import {
  ContinueLearningCTA,
  ContinueLearningCTASkeleton,
  EnrolledCourses,
  UpcomingSessions,
} from '@/components/dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useDashboard();

  const firstName = user?.name?.split(' ')[0] || 'there';

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">
            Unable to load dashboard
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section>
        {isLoading ? (
          <>
            <Skeleton className="h-9 w-64" />
            <Skeleton className="mt-1 h-5 w-48" />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="mt-1 text-gray-600">
              Continue your learning journey
            </p>
          </>
        )}
      </section>

      {/* Continue Learning CTA */}
      {isLoading ? (
        <ContinueLearningCTASkeleton />
      ) : data?.continueLearning ? (
        <ContinueLearningCTA course={data.continueLearning} />
      ) : null}

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Enrolled Courses - 2 columns */}
        <div className="lg:col-span-2">
          <EnrolledCourses
            courses={data?.courses || []}
            isLoading={isLoading}
          />
        </div>

        {/* Upcoming Sessions - 1 column */}
        <div>
          <UpcomingSessions
            sessions={data?.upcomingSessions || []}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
