import { useEffect, useState } from 'react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function SubtlePeachSparkles() {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    // Check for reduced motion preference or coarse pointer (touchscreens)
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let nextId = 0;

    const colors = ['#FF9E7D', '#FFA07A', '#FFBCA6', '#FF8A65'];

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

      // Throttled: only spawn if mouse moved at least 35px and 70ms has elapsed
      if (dist > 35 && now - lastTime > 70) {
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;

        const newParticle: SparkleParticle = {
          id: nextId++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2.5 + 3, // 3px to 5.5px
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setParticles((prev) => [...prev.slice(-5), newParticle]);

        // Clean up particle after 550ms
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 550);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping opacity-75"
        />
      ))}
    </div>
  );
}
