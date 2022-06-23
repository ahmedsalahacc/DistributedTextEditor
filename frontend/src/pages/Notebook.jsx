import React, {useState, useEffect, useRef} from 'react'

import {NotebookEngine, NotebookState, MODE} from './utils/notebookUtil'

import './styles/Notebook.css'

function Notebook() {
    // tracks the current mode used in the notebook 
    const [mode, setMode] = useState(MODE.WRITE)
    // tracks the state of the notebook
    const [nbookState, setnBookState] = useState(new NotebookState())
    // canvas reference pointer
    const canvasRef = useRef(null);
    // auto-adjust the size of the canvas (this should load and reload the state to perserve)
    useEffect(()=>{
        NotebookEngine.autoAdjustCanvasSize(canvasRef)
    },[])

  return (
    <div  className="nb__container">
        <canvas width="2000" height="2000" ref={canvasRef} style={{zIndex:`${mode}`}} className="nb__canvas"
            onPointerDown={(e)=>NotebookEngine._handlePointerDownOnCanvas(e, canvasRef)}
            onPointerMove={(e)=>NotebookEngine._handlePointerMoveOnCanvas(e, canvasRef,  nbookState, setnBookState)}
            onPointerUp={()=>NotebookEngine._handlePointerUpOnCanvas()}></canvas>

        <textarea className="nb__textarea" type="text" name="" id="" style={{zIndex:`${!mode}`}} 
            onKeyUp={(ev)=>{NotebookEngine._handleKeyDownEvent(ev, nbookState, setnBookState)}}></textarea>
    </div>
  )
}


export default Notebook
