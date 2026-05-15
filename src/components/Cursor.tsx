import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useMousePosition } from "@/src/hooks/useMousePosition";

export default function Cursor() {
  const mouse = useMousePosition();
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });
  const [displayPos, setDisplayPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkPointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null
      );
    };

    window.addEventListener("mouseover", checkPointer);

    let frameId: number;
    const animate = () => {
      cursorRef.current.x += (mouse.x - cursorRef.current.x) * 0.15;
      cursorRef.current.y += (mouse.y - cursorRef.current.y) * 0.15;
      setDisplayPos({ x: cursorRef.current.x, y: cursorRef.current.y });
      frameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("mouseover", checkPointer);
      cancelAnimationFrame(frameId);
    };
  }, [mouse]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[10001] hidden md:block"
    >
      <motion.div
        className="absolute top-0 left-0 w-10 h-10 border border-text-primary rounded-full flex items-center justify-center"
        animate={{
          x: displayPos.x - (isPointer ? 30 : 20),
          y: displayPos.y - (isPointer ? 30 : 20),
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
      >
        <div className="w-1.5 h-1.5 bg-text-primary rounded-full" />
      </motion.div>
    </div>
  );
}
