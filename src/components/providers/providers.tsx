'use client';

import QueryProvider from './query-provider';

type ProvidersProps = {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}