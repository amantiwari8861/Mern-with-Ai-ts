"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Interactive 3D tilt: the card rotates in 3D space toward the cursor and
 * springs back on leave. Pure CSS transforms — no WebGL. Children using
 * `[transform:translateZ(…)]` will lift out of the surface for parallax depth.
 */
export default function TiltCard({
  children,
  className = "",
  max = 12,
}: {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const sx = useSpring(px, { stiffness: 220, damping: 18 });
  const sy = useSpring(py, { stiffness: 220, damping: 18 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
