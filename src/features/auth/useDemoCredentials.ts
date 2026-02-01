'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type DemoUser = {
  username: string;
  password: string;
};

const demoUsers: DemoUser[] = [
  { username: 'emilys', password: 'emilyspass' },
  { username: 'michaelw', password: 'michaelwpass' },
];

export function useDemoCredentials() {
  const [lastCopied, setLastCopied] = useState('');
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setLastCopied(value);
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setLastCopied('');
      }, 2000);
    } catch {
      setLastCopied('');
    }
  };

  return {
    demoUsers: useMemo(() => demoUsers, []),
    handleCopy,
    lastCopied,
  };
}
