import React from 'react'

interface Props {
  keys: number[]
}

export default function UsizeKeys(props: Props) {
  return (
    <>
      {
        props.keys.map((key, i) =>
          i === 0 ? <span key={i}> {key}&nbsp; </span> : <small className='secondary' key={i} > - {key}&nbsp; </small>
        )
      }
    </>
  )
}

// export default UsizeKeys