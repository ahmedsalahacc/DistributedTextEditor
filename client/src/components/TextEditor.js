import React, { useEffect, useCallback, useState } from "react";
import Quill from "quill";
import { io } from "socket.io-client";

import "quill/dist/quill.snow.css";
import "../styles.css/editor.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: ["consolas"] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function TextEditor() {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  useEffect(() => {
    const s = io("http://localhost:3500");
    setSocket(s);

    return () => {
      //cleanup
      s.disconnect();
    };
  }, []);

  // quill change
  useEffect(() => {
    if (socket == null || quill == null) return;

    const deltaHandler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      console.log(delta);
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", deltaHandler);

    return () => {
      quill.off("text-change", deltaHandler);
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
    setQuill(
      new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      })
    );
  }, []);
  return <div className="text-editor" ref={editorRef}></div>;
}

export default TextEditor;
