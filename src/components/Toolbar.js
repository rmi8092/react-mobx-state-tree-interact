import React from "react";

import store from "../stores/MainStore";
import BoxModel from "../stores/models/Box";
import getRandomColor from "../utils/getRandomColor";
import uuid from "uuid/v4";

function Toolbar() {
  const addNewBox = () => {
    const box2 = BoxModel.create({
      id: uuid(),
      color: getRandomColor(),
      left: 0,
      top: 0
    });

    store.addBox(box2)
  }

  const removeBox = () => {
    store.removeBox()
  }

  return (
    <div className="toolbar">
      <button onClick={addNewBox}>Add Box</button>
      <button onClick={removeBox}>Remove Box</button>
      <input type="color" />
      <span>No boxes selected</span>
    </div>
  );
}

export default Toolbar;
