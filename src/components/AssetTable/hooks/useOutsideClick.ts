import { useEffect } from 'react'

function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: any) {
  const handleClick = (e: Event) => {
    EventTarget
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useOutsideClick
