'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompleteLesson } from '@/hooks';
import { cn } from '@/lib/utils';

interface MarkCompleteButtonProps {
  lessonId: string;
  isCompleted: boolean;
  canComplete: boolean;
  onComplete?: () => void;
  className?: string;
}

export function MarkCompleteButton({
  lessonId,
  isCompleted,
  canComplete,
  onComplete,
  className,
}: MarkCompleteButtonProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate: complete, isPending } = useCompleteLesson();

  const handleClick = () => {
    if (isCompleted || !canComplete) return;

    complete(lessonId, {
      onSuccess: () => {
        setShowSuccess(true);
        onComplete?.();
        // Reset after animation
        setTimeout(() => setShowSuccess(false), 2000);
      },
    });
  };

  if (isCompleted || showSuccess) {
    return (
      <Button
        variant="success"
        className={cn('gap-2 cursor-default', className)}
        disabled
      >
        <CheckCircle2 className="h-4 w-4" />
        Completed
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      disabled={!canComplete || isPending}
      className={cn('gap-2', className)}
      variant={canComplete ? 'default' : 'secondary'}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Marking...
        </>
      ) : (
        <>
          <CheckCircle2 className="h-4 w-4" />
          {canComplete ? 'Mark as Complete' : 'Watch to complete'}
        </>
      )}
    </Button>
  );
}
