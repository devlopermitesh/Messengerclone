import React from 'react';
import VerifyPage from './page';
import Loader from '@/components/Common/Loader';

export default function VerifyLayout() {
  return (
    <React.Suspense fallback={<Loader/>}>
      <VerifyPage />
    </React.Suspense>
  );
}
