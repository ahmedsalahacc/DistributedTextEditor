import React from "react";

// controls the mode for reading/writing
export const MODE = {
  WRITE: 0,
  DRAW: 1,
};

/**
 * # Class: Notebook Engine
 * Has the methods that handles all actions inside of the notebook
 * Especially the canvas and textarea components
 */
export class NotebookEngine {
  static __isPointerDown = false; // pointer down state management

  /**
   *  Adjusts the size of the canvas according to the screen at the beginning
   * @param {React.Ref} canvasRef - reference of the canvas
   */
  static autoAdjustCanvasSize(canvasRef) {
    let canvas = canvasRef.current;
    if (canvas === null) return;
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
  }

  /**
   * Handles the event of pointer down
   * @param {Event} event - DOM event
   * @param {React.Ref} canvasRef - reference of the canvas
   */
  static _handlePointerDownOnCanvas(event, canvasRef) {
    NotebookEngine.__isPointerDown = true;

    const canvas = canvasRef.current;
    let crtPos = NotebookEngine._getCursorPositionOnCanvas(event, canvas);
    let ctx = canvas.getContext("2d");

    ctx.moveTo(crtPos.x, crtPos.y);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
  }

  /**
   * Handles the Pointer movement on the canvas screen
   * @param {Event} event - DOM event
   * @param {React.Ref} canvasRef - reference to the canvas
   */
  static _handlePointerMoveOnCanvas(event, canvasRef, state, stateUpdater) {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");

    if (NotebookEngine.__isPointerDown) {
      let crtPos = NotebookEngine._getCursorPositionOnCanvas(event, canvas);
      ctx.lineTo(crtPos.x, crtPos.y);
      ctx.stroke();

      // decide whether to store or to drop the new state
      let newStateObject = state.getDrawingStateObject();
      if (newStateObject.length > 1) {
        //@TODO make it dependent on the thickness and interpolate in the other end
        let oldPos = newStateObject.content[newStateObject.length - 1];
        if (
          Math.abs(crtPos.x - oldPos.x) < 1 &&
          Math.abs(crtPos.y - oldPos.y) < 1
        )
          return;
      }

      // else -> store the new state
      newStateObject.content.push(crtPos);

      let newState = new NotebookState(
        state.getTextStateObject(),
        newStateObject
      );

      stateUpdater(newState);
      console.log(state);
    }
  }

  /**
   * Handles the pointer up from the canvas
   */
  static _handlePointerUpOnCanvas() {
    NotebookEngine.__isPointerDown = false;
    // store empty to indicate end (see if necessary) maybe for ctrl-z (later1) @TODO
  }

  /**
    handles the keydown press on keyboard by keeping track 
    of the state of the textfield
  
    Parameters:
    -----------
    *@param {Event} event  represents js DOM event
    *@param {React.state} state has the state of the document
    *@param {function} stateUpdater - updates the state variable
    */
  static _handleKeyDownEvent(event, state, stateUpdater) {
    let newTextContent = event.target.value;
    let textStateObject = state.getTextStateObject();

    textStateObject.content = newTextContent;

    let newState = new NotebookState(
      textStateObject,
      state.getDrawingStateObject()
    );

    stateUpdater(newState);
    console.log(state);
  }

  /**
   *
   * @param {*} event
   * @param {*} textAreaRef
   * @param {*} drawCanvasRef
   * @param {*} state
   */
  static _handleModeTransition(event, textAreaRef, drawCanvasRef, state) {}

  /**
   * Returns the current position of the mouse or the pointer
   * @param {Event} event - DOM event
   * @param {Element} canvas - Canvas Element
   * @returns {Object} {
   *    x: x-coordinate,
   *    y: y-coordinate
   * } of the mouse position
   */
  static _getCursorPositionOnCanvas(event, canvas) {
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return {
      x: x,
      y: y,
    };
  }
}

//***********************************************************************************
//***********************************************************************************

/**
 * # Class: Notebook Engine
 * Has the methods that handles all actions inside of the notebook
 * Especially the canvas and textarea components
 */
export class NotebookState {
  /**
   *
   * @param {string} text - object that has the text state
   * should be in the format:{
   * content: String,
   * style: Object
   * }
   * @param {Array} drawing - object that has the drawing state
   * should be in the format:{
   * content: Array,
   * style: Object
   * }
   */
  constructor(text = null, drawing = null) {
    // check if there is a predefined state
    this.text =
      text === null
        ? {
            content: "",
            style: {
              color: "black",
            },
          }
        : text;
    this.drawing =
      drawing === null
        ? {
            content: [],
            style: {
              color: "black",
            },
          }
        : drawing;
  }

  /**
   * Sets the Text state in the notebook state object
   * @param {Object} newObject - represents the new Text State Object
   */
  setTextStateObject(newObject) {
    this.text = newObject;
  }

  /**
   * Sets the Drawing state in the notebook state object
   * @param {Object} newObject - represents the new Drawing State Object
   */
  setDrawingStateObject(newObject) {
    this.drawing = newObject;
  }

  /**
   * gets the notebookstate's text state object
   * @returns Object
   */
  getTextStateObject() {
    return this.text;
  }

  /**
   * gets the notebookstate's drawing state object
   * @returns Object
   */
  getDrawingStateObject() {
    return this.drawing;
  }
}
