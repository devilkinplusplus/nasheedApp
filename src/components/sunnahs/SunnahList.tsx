import React from 'react'
import OneSunnah from './OneSunnah'

function SunnahList() {
  return (
    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 grid-rows-2 p-4 m-4'>
        <OneSunnah />
        <OneSunnah />
        <OneSunnah />
        <OneSunnah />
        <OneSunnah />
        <OneSunnah />
    </div>
  )
}

export default SunnahList