import { useEffect, useRef } from 'react'
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'
import Base from './Base'
import './App.css'


export default function App() {
  // return <h1 className='text-blue-500 '> Hi</h1>
  // return (<AnaarBomb/>);
  const ref = useRef<FireworksHandlers>(null)

  const toggle = () => {
    if (!ref.current) return
    if (ref.current.isRunning) {
      ref.current.stop()
    } else {
      ref.current.start()
    }
  }
  useEffect(()=>{
    if (!ref.current) return;
    ref.current.stop()
  }, [])
  

  return (
    <div className='container w-screen min-w-full'>
     
      <Fireworks
        ref={ref}
        options={{
          opacity: 0.5,
          sound: {
            enabled: true,
            volume: { min: 1, max: 50 },
            files: ['fireworks-whistlewav-14541.mp3', 'fireworks-close-29630.mp3'],
          },
        }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '75vh' , // Adjust height as needed
          //position: 'fixed',
          background: '#000',
          zIndex: 0 // Ensure it's behind the buttons and heading
        }}
      />
    
       
      <Base fireworksRef = {ref}/>
    </div>
  )
}
