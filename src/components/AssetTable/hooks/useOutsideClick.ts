import { useEffect } from 'react'

function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: any) {
  const handleClick = (e: Event) => {
    EventTarget
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  })
}

export default useOutsideClick
