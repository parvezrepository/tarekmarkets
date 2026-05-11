import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 ${className}`} />
  );
};

export const ProductCardSkeleton = () => (
  <div className="vibe-card bg-white dark:bg-slate-900 overflow-hidden flex flex-col h-full border border-slate-100 dark:border-slate-800">
    <Skeleton className="aspect-[16/10] w-full" />
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-2 w-20" />
        <Skeleton className="h-2 w-16" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <div className="pt-4 flex justify-between items-end">
        <div className="space-y-2">
          <Skeleton className="h-2 w-12" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="border-b border-slate-100 dark:border-slate-800">
    <td className="px-8 py-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-14 h-14" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-2 w-48" />
        </div>
      </div>
    </td>
    <td className="px-8 py-6"><Skeleton className="h-6 w-24" /></td>
    <td className="px-8 py-6"><Skeleton className="h-8 w-20" /></td>
    <td className="px-8 py-6"><Skeleton className="h-4 w-16" /></td>
    <td className="px-8 py-6"><div className="flex justify-end space-x-3"><Skeleton className="h-10 w-10" /><Skeleton className="h-10 w-10" /></div></td>
  </tr>
);

export default Skeleton;
