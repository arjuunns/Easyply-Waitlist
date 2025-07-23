"use client"

import { AnimatePresence, motion, type MotionProps } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface WordRotateProps {
  words?: string[]
  duration?: number
  motionProps?: MotionProps
  className?: string
}

export function WordRotate({
  words = [""],
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  if (!words.length) return null

  return (
    <div className="overflow-hidden inline-block">
      <AnimatePresence mode="wait">
        <motion.span key={`${words[index]}-${index}`} className={cn("inline-block", className)} {...motionProps}>
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
