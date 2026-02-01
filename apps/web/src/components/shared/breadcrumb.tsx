'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1 text-sm', className)}
    >
      <Link
        href="/dashboard"
        className="flex items-center text-gray-500 transition hover:text-brand-600"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Dashboard</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4 text-gray-300" />
            {isLast || !item.href ? (
              <span
                className={cn(
                  'max-w-[200px] truncate',
                  isLast ? 'font-medium text-gray-900' : 'text-gray-500'
                )}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="max-w-[200px] truncate text-gray-500 transition hover:text-brand-600"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
