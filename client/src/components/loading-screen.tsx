import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center transition-colors duration-300 bg-white">
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto mb-6">
            <div className="w-full h-full border-4 border-accent/30 rounded-2xl animate-pulse">
              <div className="w-full h-full bg-gradient-to-br from-accent to-accent/60 rounded-xl animate-float">
                <div className="flex items-center justify-center h-full">
                  <span className="text-primary font-bold text-2xl">FI</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rotating circles */}
          <div className="absolute -top-2 -left-2 w-24 h-24 border-2 border-accent/20 rounded-full animate-spin">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-accent rounded-full -translate-x-1/2"></div>
          </div>
        </div>

        {/* Text Animation */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gradient animate-fade-in">
            First Interior
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Crafting Exceptional Spaces
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto space-y-2">
          <div className="w-full h-1 bg-accent/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground">
            {Math.round(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
}