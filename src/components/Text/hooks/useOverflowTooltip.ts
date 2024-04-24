import { useState, useEffect, useRef } from 'react'

// Defining the hook with a generic type that extends HTMLElement to be more flexible
function useOverflowTooltip<T extends HTMLElement>(): [
  React.RefObject<T>,
  boolean
] {
  const ref = useRef<T>(null)
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false)

  useEffect(() => {
    const checkOverflow = () => {
      const current = ref.current
      if (current) {
        const isOverflow = current.offsetWidth < current.scrollWidth
        setIsOverflowing(isOverflow)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [])

  return [ref, isOverflowing]
}

export default useOverflowTooltip
