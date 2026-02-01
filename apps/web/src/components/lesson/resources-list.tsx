'use client';

import { FileText, Presentation, Code, Link as LinkIcon, File, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Resource, ResourceType } from '@/types';

interface ResourcesListProps {
  resources: Resource[];
}

const resourceIcons: Record<ResourceType, React.ReactNode> = {
  PDF: <FileText className="h-5 w-5 text-red-500" />,
  SLIDE: <Presentation className="h-5 w-5 text-orange-500" />,
  CODE: <Code className="h-5 w-5 text-emerald-500" />,
  LINK: <LinkIcon className="h-5 w-5 text-blue-500" />,
  OTHER: <File className="h-5 w-5 text-gray-500" />,
};

export function ResourcesList({ resources }: ResourcesListProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-3">
        <h3 className="font-semibold text-gray-900">Resources</h3>
      </div>
      <ul className="divide-y divide-gray-100">
        {resources.map((resource) => (
          <li key={resource.id}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-gray-50"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                {resourceIcons[resource.type]}
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {resource.title}
                </p>
                <p className="text-xs text-gray-500 uppercase">
                  {resource.type}
                </p>
              </div>

              {/* Action */}
              {resource.type === 'LINK' ? (
                <ExternalLink className="h-4 w-4 text-gray-400" />
              ) : (
                <Download className="h-4 w-4 text-gray-400" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
