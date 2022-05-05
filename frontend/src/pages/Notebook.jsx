import React, {useState, useEffect, useRef} from 'react'

import {CanvasManager} from './utils/notebookUtil'

// controls the mode for reading/writing
const MODE = {
    WRITE:0,
    DRAW:1
}

function Notebook() {
    // tracks the current mode used in the notebook 
    const [mode, setMode] = useState(MODE.WRITE)
    // tracks the state of the notebook
    const [nbookState, setnBookState] = useState({
        style:{
            color: 'black'
        },
        text:{
            content:''
        },
        drawing:{
            content:[]
        }
    })
    // styles
    const containerStyle = {
        display: 'flex',
        position: 'relative',
        width: '100wh',
        height: '100vh',
        top:0,
        left:0
    }

    const textAreaStyle = {
        backgroundColor: 'rgba(255,255,255,0.1)',
         width: '100%',
          height: '100vh',
           zIndex:`${mode}`,
            position:'absolute'}

    const canvasStyle = {
            top:0,
            left:0,
            backgroundColor: 'rgba(255,255,255,0.1)',
            zIndex:`${!mode}`,
            position:'absolute',
            width:'100%',
            height: '100vh'
        }
  return (
    <div style={containerStyle}>
        <canvas style={textAreaStyle}></canvas>
        <textarea type="text" name="" id="" style={canvasStyle} 
            onKeyDown={(ev)=>{CanvasManager._handleKeyDownEvent(ev, nbookState, setnBookState)}}></textarea>
    </div>
  )
}


export default Notebook