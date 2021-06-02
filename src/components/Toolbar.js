import React from "react";
import { observer } from "mobx-react";
import uuid from "uuid/v4";

import store, { undoManager } from "../stores/MainStore";
import BoxModel from "../stores/models/Box";
import getRandomColor from "../utils/getRandomColor";

function Toolbar() {
  const addNewBox = () => {
    const newBox = BoxModel.create({
      id: uuid(),
      color: getRandomColor(),
      left: 0,
      top: 0
    });

    store.addBox(newBox)
  }

  const removeBox = () => {
    store.removeBox()
  }

  const changeColor = (color) => {
    store.applyColorToSelectedBox(color)
  }

  const singularPluralBoxTerm = () => {
    return store.boxesSelectedCounter() > 1 ? <span>boxes</span> : <span>box</span>
  }
  
  const undoAction = () => {
    undoManager.canUndo && undoManager.undo()
  }

  const redoAction = () => {
    undoManager.canRedo && undoManager.redo()
  }

  const saveState = () => {
    store.saveState()
  }

  const clearState = () => {
    store.clearState()
  }

  return (
    <div className="toolbar">
      <button onClick={addNewBox}>Add Box</button>
      <button onClick={removeBox}>Remove Box</button>
      <input type="color" onChange={e => changeColor(e.target.value)}/>
      {store.boxesSelectedCounter() > 0 ? <span>{store.boxesSelectedCounter()} {singularPluralBoxTerm()} selected</span> : <span>No boxes selected</span> }
      <button onClick={undoAction}><span className="symbol">&#10226;</span>Undo</button>
      <button onClick={redoAction}><span className="symbol">&#10227;</span>Redo</button>
      <div className="save-clear-state">
        <button onClick={clearState}><span className="symbol">&#10005;</span>Clear</button>
        <button onClick={saveState}><span className="symbol">&#10003;</span>Save</button>
      </div>
    </div>
  );
}

export default observer(Toolbar);
