'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

interface LessonNavigationProps {
  courseId: string;
  prevLesson: { id: string; title: string; moduleId: string } | null;
  nextLesson: { id: string; title: string; moduleId: string } | null;
}

export function LessonNavigation({
  courseId,
  prevLesson,
  nextLesson,
}: LessonNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4">
      {/* Previous */}
      <div className="flex-1">
        {prevLesson ? (
          <Link href={ROUTES.LESSON(courseId, prevLesson.moduleId, prevLesson.id)}>
            <Button variant="ghost" className="gap-2 text-left h-auto py-2">
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Previous</p>
                <p className="truncate font-medium">{prevLesson.title}</p>
              </div>
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Next */}
      <div className="flex-1 text-right">
        {nextLesson ? (
          <Link href={ROUTES.LESSON(courseId, nextLesson.moduleId, nextLesson.id)}>
            <Button className="gap-2 text-right h-auto py-2">
              <div className="min-w-0">
                <p className="text-xs text-white/70">Next</p>
                <p className="truncate font-medium">{nextLesson.title}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Button>
          </Link>
        ) : (
          <Button variant="secondary" disabled>
            Course Complete
          </Button>
        )}
      </div>
    </div>
  );
}
