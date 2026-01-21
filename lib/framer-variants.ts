// Framer Motion animation variants for consistent animations across the app

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
}

export const fadeInDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
}

export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
}

export const slideInLeft = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
}

export const slideInRight = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
}

// Stagger children animations
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut" as const,
        },
    },
}

// Premium hover effects
export const hoverLift = {
    rest: { y: 0, scale: 1 },
    hover: {
        y: -4,
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: "easeInOut" as const,
        },
    },
}

export const hoverScale = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3,
            ease: "easeInOut" as const,
        },
    },
}

// Smooth transition config
export const smoothTransition = {
    duration: 0.5,
    ease: "easeInOut" as const,
}

export const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
}

// Page transitions
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeInOut" as const,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4,
            ease: "easeInOut" as const,
        },
    },
}
