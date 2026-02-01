'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type PopoverProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  id?: string;
  role?: string;
};

export default function Popover({
  isOpen,
  onClose,
  children,
  className,
  id,
  role = 'dialog',
}: PopoverProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (containerRef.current && !containerRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className={className} id={id} role={role}>
      {children}
    </div>
  );
}
