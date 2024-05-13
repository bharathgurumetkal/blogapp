import React from 'react'
import {useRouteError} from 'react-router-dom'

function Errorpage() {
  let routingError=useRouteError()
  return (
    <div className='mt-5 text-center p-5 bg-info'>
      <h1 className='text-danger '>{routingError.status}-{routingError.data}</h1>
    </div>
  )
}

export default Errorpage