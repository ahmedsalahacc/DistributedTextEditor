import React, {useState, useEffect, useRef} from 'react'

import {NotebookEngine, NotebookState, Synchronizer} from './utils/notebookUtil'
import { MODE, HTTP_SERVER, SOCKET_SERVER } from './utils/consts'

import './styles/Notebook.css'

function Notebook() {
    // tracks the current mode used in the notebook 
    const [mode, setMode] = useState(MODE.WRITE)
    // tracks the state of the notebook
    const [nbookState, setnBookState] = useState(new NotebookState())
    // canvas reference pointer
    const canvasRef = useRef(null);
    const textAreaRef = useRef(null);
    // init state sync
    const sync = new Synchronizer(SOCKET_SERVER, HTTP_SERVER) 
    // auto-adjust the size of the canvas (this should load and reload the state to perserve)
    NotebookEngine.autoAdjustCanvasSize(canvasRef)
    sync.requestContent(setnBookState, canvasRef, textAreaRef)
    sync.startSync(nbookState, setnBookState, canvasRef,textAreaRef)

  return (
    <div  className="nb__container">
        <canvas width="2000" height="2000" ref={canvasRef} style={{zIndex:`${mode}`}} className="nb__canvas"
            onPointerDown={(e)=>NotebookEngine._handlePointerDownOnCanvas(e, canvasRef)}
            onPointerMove={(e)=>NotebookEngine._handlePointerMoveOnCanvas(e, canvasRef,  nbookState, setnBookState)}
            onPointerUp={()=>NotebookEngine._handlePointerUpOnCanvas()}></canvas>

        <textarea className="nb__textarea" ref={textAreaRef} type="text" name="" id="" style={{zIndex:`${!mode}`}} 
            onKeyUp={(ev)=>{NotebookEngine._handleKeyDownEvent(ev, nbookState, setnBookState)}}></textarea>
    </div>
  )

}


export default Notebook
