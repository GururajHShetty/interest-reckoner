import React from 'react'
import Slider from './components/Slider'

function App() {
  return (
    <div className="container" >
      <h1><span className="badge badge-info">INTEREST RECKONER</span></h1>
      <div className="row" >
        <div className="col-md-8" ><br/>
          <Slider/>
        </div>
      </div>
    </div>
  )
}

export default App
