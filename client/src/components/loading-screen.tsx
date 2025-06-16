import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="text-center">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-accent-custom text-lg font-medium">Loading Excellence...</p>
      </div>
    </div>
  );
}
