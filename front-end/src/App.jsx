import React from 'react'
import Button from './global-component/ui/button'

export default function App() {
  return (
    <div>
      <h1 className='text-blue-900'>MenuGo Digital Menu</h1>
      <Button className='btn-primary' label="Click me" onClick={() => console.log("Clicked!")} />
    </div>
  )
}
