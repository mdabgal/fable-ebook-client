import React from 'react';


export const CardSkeleton = () => {
    return (
        <div className="border border-gray-200 rounded-xl p-4 max-w-sm w-full mx-auto shadow-sm animate-pulse bg-white">
            <div className="bg-gray-200 h-48 w-full rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
        </div>
    );
};


export const TableRowSkeleton = () => {
    return (
        <tr className="animate-pulse border-b border-gray-100">
           <td className="p-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
        </tr>
    );
};