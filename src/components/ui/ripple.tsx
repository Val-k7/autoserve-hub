import { useEffect, useState } from 'react';

interface RippleProps {
  color?: string;
  duration?: number;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export const useRipple = (color = 'rgba(255, 255, 255, 0.6)', duration = 600) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (ripples.length > 0) {
      const timeoutId = setTimeout(() => {
        setRipples((prevRipples) => prevRipples.slice(1));
      }, duration);
      return () => clearTimeout(timeoutId);
    }
  }, [ripples, duration]);

  const addRipple = (event: React.MouseEvent<HTMLElement>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rippleContainer.width, rippleContainer.height);
    const x = event.clientX - rippleContainer.left - size / 2;
    const y = event.clientY - rippleContainer.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  return { ripples, addRipple, duration, color };
};

export const RippleContainer = ({ ripples, duration, color }: { ripples: Ripple[]; duration: number; color: string }) => {
  return (
    <span className="absolute inset-0 overflow-hidden pointer-events-none">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
            animation: `ripple ${duration}ms ease-out`,
          }}
        />
      ))}
    </span>
  );
};
