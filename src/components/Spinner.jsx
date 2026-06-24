import React from 'react';

const Spinner = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <div className="h-16 w-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>

      <h2 className="mt-4 text-xl font-bold text-emerald-600">
        Fable Ebook
      </h2>

      <p className="text-slate-500">Loading...</p>
    </div>
  
    );
};

export default Spinner;