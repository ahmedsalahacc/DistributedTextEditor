import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import Quill from "quill";
import { io } from "socket.io-client";

import "quill/dist/quill.snow.css";
import "../styles.css/editor.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const SAVE_INTERVAL = 2000; // every 2 seconds

function TextEditor() {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { id: documentId } = useParams();

  // establish socket connection
  useEffect(() => {
    const s = io("http://localhost:3500");
    setSocket(s);

    return () => {
      //cleanup
      s.disconnect();
    };
  }, []);

  // load document if exists
  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("doc/load", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("doc/get", documentId);
  }, [socket, quill, documentId]);

  // autosave
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("autosave", quill.getContents());
    }, SAVE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  // quill delta push
  useEffect(() => {
    if (socket == null || quill == null) return;

    const deltaPushHandler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      console.log(delta);
      socket.emit("delta/push", delta);
    };
    quill.on("text-change", deltaPushHandler);

    return () => {
      quill.off("text-change", deltaPushHandler);
    };
  }, [socket, quill]);

  // quill delta pull
  useEffect(() => {
    if (socket == null || quill == null) return;

    const deltaPullHandler = (delta) => {
      quill.updateContents(delta);
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
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    // disable while loading
    q.disable();
    q.setText("Connecting...");
    setQuill(q);
  }, []);
  return <div className="text-editor" ref={editorRef}></div>;
}

export default TextEditor;
