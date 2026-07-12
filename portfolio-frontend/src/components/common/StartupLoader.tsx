import React, { useState, useEffect } from 'react';

interface StartupLoaderProps {
  children: React.ReactNode;
}

const MESSAGES = [
  'Waking up server from cold start...',
  'Connecting to database...',
  'Initializing services...',
  'Fetching portfolio content...',
  'Preparing layout...',
  'Almost ready to load...',
];

export default function StartupLoader({ children }: StartupLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isAwake, setIsAwake] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [fadeAway, setFadeAway] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Poll health endpoint every 3 seconds
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    
    const checkHealth = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
        const res = await fetch(`${baseUrl}/health`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setIsAwake(true);
            clearInterval(intervalId);
          }
        }
      } catch (err) {
        console.warn('Backend is waking up...', err);
      }
    };

    // Initial check
    checkHealth();

    // Check every 3 seconds
    intervalId = setInterval(checkHealth, 3000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Animate progress bar and track elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 100);

      setProgress((prev) => {
        if (isAwake) {
          return 100;
        }
        // Asymptotically approach 90% (e.g. increase by a fraction of the remaining distance to 90%)
        // At 100ms interval, (90 - prev) * 0.01 provides a smooth slower-and-slower curve
        const next = prev + (90 - prev) * 0.01;
        return parseFloat(next.toFixed(2));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isAwake]);

  // Rotate messages every 4 seconds
  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(msgTimer);
  }, []);

  // When backend is awake and progress hits 100%, trigger fade out
  useEffect(() => {
    if (isAwake && progress >= 99.9) {
      const fadeTimeout = setTimeout(() => {
        setFadeAway(true);
        // Wait for CSS fade transition to finish before unmounting
        const unmountTimeout = setTimeout(() => {
          setShowLoader(false);
        }, 500); // matches CSS duration-500
        return () => clearTimeout(unmountTimeout);
      }, 400); // short delay to show 100% progress
      return () => clearTimeout(fadeTimeout);
    }
  }, [isAwake, progress]);

  if (!showLoader) {
    return <>{children}</>;
  }

  const isTakingTooLong = elapsedTime >= 90000;

  return (
    <>
      {/* Render the application children underneath but hidden or don't mount until awake to prevent errors */}
      {isAwake && children}

      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0e16] px-4 text-[#f5f6f8] transition-opacity duration-500 ease-in-out ${
          fadeAway ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Subtle glowing background blobs */}
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[var(--color-accent-blue)] opacity-10 blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[var(--color-accent-purple)] opacity-10 blur-[100px] pointer-events-none animate-pulse"></div>

        <div className="glass max-w-md w-full rounded-2xl p-8 flex flex-col items-center justify-center border border-[var(--color-glass-border)] shadow-2xl relative overflow-hidden">
          {/* Glowing border accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)]"></div>

          {/* Loading Animation: Outer & Inner spinning rings */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
            {/* Outer ring */}
            <div className="absolute h-full w-full rounded-full border-4 border-[rgba(255,255,255,0.05)] border-t-[var(--color-accent-blue)] border-r-[var(--color-accent-blue)] animate-spin"></div>
            {/* Inner ring (spins opposite direction) */}
            <div className="absolute h-12 w-12 rounded-full border-4 border-[rgba(255,255,255,0.05)] border-b-[var(--color-accent-purple)] border-l-[var(--color-accent-purple)] animate-spin-reverse"></div>
            {/* Center dot */}
            <div className="h-4 w-4 rounded-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)] shadow-[0_0_12px_var(--color-accent-blue)]"></div>
          </div>

          {/* Header */}
          <h2 className="mb-2 text-xl font-bold tracking-wide bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)] bg-clip-text text-transparent">
            Bhavya Portfolio
          </h2>

          {/* Message (rotating or warning) */}
          <div className="h-12 flex items-center justify-center text-center px-2">
            {isTakingTooLong ? (
              <p className="text-sm font-medium text-[#ffd074] pulse-glow">
                Server is taking longer than expected. Please wait while it wakes up.
              </p>
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)] transition-all duration-300">
                {MESSAGES[messageIndex]}
              </p>
            )}
          </div>

          {/* Progress Bar Container */}
          <div className="mt-6 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[var(--color-text-muted)] font-mono">
                {isAwake ? 'Connected' : 'Connecting...'}
              </span>
              <span className="text-xs text-[var(--color-accent-blue)] font-bold font-mono">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-[6px] w-full rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden p-[1px] border border-[rgba(255,255,255,0.03)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)] transition-all duration-100 ease-out shadow-[0_0_8px_rgba(110,168,254,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
