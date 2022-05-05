export class CanvasManager {
  static drawOnCanvas(x, y, style = null) {}

  static _handleKeyDownEvent(event, state, stateUpdater) {
    let textContent = event.target.value;
    let newState = { ...state };
    newState.text.content = textContent;
    stateUpdater(newState);
    // console.log(state);
  }

  static _handleModeTransition(event, textAreaRef, drawCanvasRef, state) {}
}
