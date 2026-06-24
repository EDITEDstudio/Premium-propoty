import React from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  key?: React.Key;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = "",
  once = true,
}: ScrollRevealProps) {
  // Define initial positions and styles based on the given direction
  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: distance, scale: 1 },
          visible: { opacity: 1, y: 0, scale: 1 },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -distance, scale: 1 },
          visible: { opacity: 1, y: 0, scale: 1 },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: distance, scale: 1 },
          visible: { opacity: 1, x: 0, scale: 1 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -distance, scale: 1 },
          visible: { opacity: 1, x: 0, scale: 1 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.95, y: 0, x: 0 },
          visible: { opacity: 1, scale: 1, y: 0, x: 0 },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0, y: 0, x: 0, scale: 1 },
          visible: { opacity: 1, y: 0, x: 0, scale: 1 },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a premium, non-robotic feel
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A handy component to animate items in a grid with staggered sequential delays.
 */
interface ScrollGridProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  duration?: number;
  distance?: number;
}

export function ScrollGrid({
  children,
  className = "",
  staggerDelay = 0.1,
  direction = "up",
  duration = 0.6,
  distance = 30,
}: ScrollGridProps) {
  const extractGridClasses = (classesStr: string) => {
    const words = classesStr.split(/\s+/).filter(Boolean);
    const gridClasses: string[] = [];
    const otherClasses: string[] = [];

    words.forEach(cls => {
      if (
        cls.startsWith("col-") ||
        cls.startsWith("row-") ||
        cls.includes(":col-") ||
        cls.includes(":row-")
      ) {
        gridClasses.push(cls);
      } else {
        otherClasses.push(cls);
      }
    });

    return {
      gridClasses: gridClasses.join(" "),
      otherClasses: otherClasses.join(" "),
    };
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        
        const childClassName = (child.props as any).className || "";
        const { gridClasses, otherClasses } = extractGridClasses(childClassName);

        return (
          <ScrollReveal
            key={idx}
            direction={direction}
            delay={idx * staggerDelay}
            duration={duration}
            distance={distance}
            className={gridClasses || undefined}
          >
            {React.cloneElement(child, {
              className: otherClasses,
            } as any)}
          </ScrollReveal>
        );
      })}
    </div>
  );
}
