'use client'
import React from 'react'

const MovingText = () => {
  return (
    <div className='w-full bg-black overflow-hidden'>
      <p className='text-white whitespace-nowrap animate-marquee'>
        Reduceri permanente la comenzi: PESTE 500 lei - 15% &nbsp;&nbsp;&nbsp; PESTE 1000 lei - 20% &nbsp;&nbsp;&nbsp; PESTE 1500 lei - 25% &nbsp;&nbsp;&nbsp; PESTE 2500 lei - 30%
      </p>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default MovingText
