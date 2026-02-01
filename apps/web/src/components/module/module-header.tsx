'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/constants';

interface ModuleHeaderProps {
  module: {
    id: string;
    title: string;
    description?: string;
    objective?: string;
    progress: number;
    completedLessons: number;
    lessonCount: number;
    course: { id: string; title: string };
  };
}

export function ModuleHeader({ module }: ModuleHeaderProps) {
  const isComplete = module.progress === 100;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      {/* Back link */}
      <Link
        href={ROUTES.COURSE(module.course.id)}
        className="inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        {module.course.title}
      </Link>

      <div className="mt-4">
        {/* Status */}
        {isComplete && (
          <Badge variant="success" className="mb-2">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>

        {/* Description */}
        {module.description && (
          <p className="mt-2 text-gray-600">{module.description}</p>
        )}

        {/* Objective */}
        {module.objective && (
          <div className="mt-4 rounded-lg bg-brand-50 p-4">
            <p className="text-sm">
              <span className="font-semibold text-brand-700">Objective: </span>
              <span className="text-brand-900">{module.objective}</span>
            </p>
          </div>
        )}

        {/* Progress */}
        <div className="mt-6 max-w-md">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-gray-600">
              <BookOpen className="h-4 w-4" />
              {module.completedLessons} of {module.lessonCount} lessons
            </span>
            <span className="font-medium text-gray-900">{module.progress}%</span>
          </div>
          <Progress
            value={module.progress}
            className="mt-2 h-2"
            indicatorClassName={isComplete ? 'bg-emerald-500' : 'bg-brand-500'}
          />
        </div>
      </div>
    </div>
  );
}
