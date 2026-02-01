'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/constants';

interface LessonHeaderProps {
  lesson: {
    title: string;
    durationMinutes: number;
    isCompleted: boolean;
    module: {
      id: string;
      title: string;
      courseId: string;
      courseTitle: string;
    };
  };
}

export function LessonHeader({ lesson }: LessonHeaderProps) {
  return (
    <div>
      {/* Back link */}
      <Link
        href={ROUTES.MODULE(lesson.module.courseId, lesson.module.id)}
        className="inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        {lesson.module.title}
      </Link>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {lesson.durationMinutes} min
            </span>
            <span>•</span>
            <span>{lesson.module.courseTitle}</span>
          </div>
        </div>

        {lesson.isCompleted && (
          <Badge variant="success" className="shrink-0">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )}
      </div>
    </div>
  );
}
