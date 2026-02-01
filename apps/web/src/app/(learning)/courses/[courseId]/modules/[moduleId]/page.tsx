'use client';

import { use } from 'react';
import { useModule } from '@/hooks';
import { Breadcrumb } from '@/components/shared';
import { ModuleHeader, LessonList } from '@/components/module';
import { SessionCard } from '@/components/dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { format } from 'date-fns';

interface ModulePageProps {
  params: Promise<{ courseId: string; moduleId: string }>;
}

export default function ModulePage({ params }: ModulePageProps) {
  const { courseId, moduleId } = use(params);
  const { data: module, isLoading, error } = useModule(moduleId);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">
            Unable to load module
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {error instanceof Error ? error.message : 'Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !module) {
    return <ModulePageSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'My Courses', href: '/courses' },
          { label: module.course.title, href: ROUTES.COURSE(module.course.id) },
          { label: module.title },
        ]}
      />

      {/* Module Header */}
      <ModuleHeader module={module} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lessons - Main content */}
        <div className="lg:col-span-2">
          <LessonList
            lessons={module.lessons}
            courseId={module.course.id}
            moduleId={module.id}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment */}
          {module.assignment && (
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                <FileText className="h-5 w-5 text-amber-500" />
                Assignment
              </h3>
              <div className="mt-3">
                <p className="font-medium text-gray-900">
                  {module.assignment.title}
                </p>
                {module.assignment.dueDate && (
                  <p className="mt-1 text-sm text-gray-500">
                    Due: {format(new Date(module.assignment.dueDate), 'MMMM d, yyyy')}
                  </p>
                )}
                <Badge
                  variant={module.assignment.isSubmitted ? 'success' : 'warning'}
                  className="mt-2"
                >
                  {module.assignment.isSubmitted ? 'Submitted' : 'Not submitted'}
                </Badge>
              </div>
            </div>
          )}

          {/* Live Sessions */}
          {module.sessions.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                <Calendar className="h-5 w-5 text-brand-500" />
                Live Sessions
              </h3>
              <div className="mt-3 space-y-3">
                {module.sessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={{
                      ...session,
                      courseTitle: module.course.title,
                      moduleTitle: module.title,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModulePageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-5 w-64" />
      <Skeleton className="h-48 rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="h-64 rounded-xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
