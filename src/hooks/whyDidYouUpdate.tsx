import { useEffect, useRef } from 'react'

type Props = Record<string, any>

interface Change {
  from: any
  to: any
}

type Changes = Record<string, Change>

function useWhyDidYouUpdate(name: string, props: Props) {
  const previousProps = useRef<Props>()

  useEffect(() => {
    if (previousProps.current) {
      const allKeys: Array<string> = Object.keys({
        ...previousProps.current,
        ...props
      })
      const changesObj: Changes = {}

      allKeys.forEach((key) => {
        if (previousProps.current![key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current![key],
            to: props[key]
          }
        }
      })

      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj)
      }
    }

    previousProps.current = props
  }, [props, name])
}

export default useWhyDidYouUpdate
