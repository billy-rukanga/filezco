import React from 'react'
import Popover from './Popover'

export default function Account () {
  const ref = React.useRef(null)
  const [show, setShow] = React.useState(false)

  React.useEffect(
    () => {
      const addhover = () => setShow(true)
      const removehover = () => setShow(false)
      ref.current.addEventListener('mouseover', addhover)
      ref.current.addEventListener('mouseout', removehover)
      return () => {
        ref.current.removeEventListener('mouseover', addhover)
        ref.current.addEventListener('mouseout', removehover)
      }
    },
    [ref]
  )

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <img
        src="https://ui-avatars.com/api/?name=U&rounded=true&size=54"
        alt="avatar"
      />
      <Popover show={show} />
    </div>
  )
}
