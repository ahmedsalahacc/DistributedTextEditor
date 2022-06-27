import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import Quill from "quill";
import { io } from "socket.io-client";


import {DifferentialSynchronizationClient} from '../Utils/DifferentialSynchronization'
import "quill/dist/quill.snow.css";
import "../styles/editor.css";

const TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'align': [] }],

  ['clean'],                                         // remove formatting button
  ['omega']
];

const SAVE_INTERVAL = 2000; // every 2 seconds




function Notebook() {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [nUsers, setNUsers] = useState(1)
  const { id: documentId } = useParams();
  const dsc = new DifferentialSynchronizationClient()
  // establish socket connection
  useEffect(() => {
    const s = io("http://localhost:3500");
    setSocket(s);

    return () => {
      //cleanup
      s.disconnect();
    };
  }, []);

  // load number of users
  useEffect(()=>{
    console.log('onload users')

    if (socket == null || quill == null) return;
    function handler(n){
      setNUsers(n)
    }
    socket.on('n-users', handler)

    return () => {
      socket.off('n-users', handler)
    };
  },[socket, quill])

  // load document if exists
  useEffect(() => {
    console.log('onload doc')
    if (socket == null || quill == null) return;
    socket.once("doc/load", (document) => {
      console.log(document)
      quill.setText(document);
      dsc.initShadow(document)
      quill.enable();
    });
    socket.emit("doc/get", documentId);
  }, [socket, quill, documentId]);


  // autosave
  useEffect(() => {
    console.log('on autosave')
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
        quill.enable()
        dsc.updateShadow(quill.getText())
        socket.emit("autosave", quill.getText());
      if(!socket.connected){
        window.alert('Check your connection')
        quill.setText("Trying to connect... check your connection.");
        quill.disable()
      }
    }, SAVE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  // quill delta push
  useEffect(() => {
    console.log('delta push')
    if (socket == null || quill == null) return;

    const deltaPushHandler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      const clientText = quill.getText()
      console.log(clientText, typeof clientText)
      const patches = dsc.getPatchesToMatchText(clientText)
      console.log(patches)
      dsc.updateShadow(clientText)
      socket.emit("delta/push", patches);
    };
    quill.on("text-change", deltaPushHandler);

    return () => {
      quill.off("text-change", deltaPushHandler);
    };
  }, [socket, quill]);

  // quill delta pull
  useEffect(() => {
    console.log('on delta pull')

    if (socket == null || quill == null) return;

    const deltaPullHandler = (delta) => {
      dsc.applyPatchesToShadow(delta)
      const clientText = quill.getText()
      console.log('delta', delta)
      const newClientText = dsc.applyPatchesToText(delta, clientText)
      quill.setText(newClientText)
      // quill.updateContents(delta);
      // const newPatches = dsc.getPatchesToMatchText(newClientText)
      // dsc.updateShadow(newClientText)
      // socket.emit("delta/push", newPatches);
    };
    socket.on("delta/pull", deltaPullHandler);

    return () => {
      socket.off("delta/pull", deltaPullHandler);
    };
  }, [socket, quill]);

  // init editor ref
  const editorRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    // cleanup
    wrapper.innerHTML = "";
    // code
    const editor = document.createElement("div");
    
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      // modules: { toolbar: '' },
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    // disable while loading
    q.disable();
    q.setText("Connecting...");
    setQuill(q);
    
  }, []);


  return (
    <div className="master">
    <span className="users-label"><strong>{nUsers}</strong> user(s) connected</span>
    <div className="parent-container">
    {/* <canvas className="draw-canvas" style={{zIndex:1000, }}></canvas> */}
    <div className="text-editor" ref={editorRef} style={{zIndex: 0}}></div>
    </div>
  </div>
    );
}

export default Notebook;
