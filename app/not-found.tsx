import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CloudOff } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center py-5 text-center">
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <CloudOff className="h-20 w-20 text-gray-400" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">404</h1>
          <h2 className="text-xl font-semibold text-gray-600">
            Page not found
          </h2>
        </div>

        <p className="mx-auto max-w-md text-gray-500">
          The page you&apos;re looking for doesn&rsquo;t exist or has been
          moved. Perhaps the weather data you&apos;re seeking has drifted away.
        </p>

        <div className="pt-4">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
