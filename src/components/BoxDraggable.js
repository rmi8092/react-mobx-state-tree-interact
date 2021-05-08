import React from "react";
import { observer } from "mobx-react";

import store from "../stores/MainStore";

function BoxDraggable(props) {
  const selectBox = () => {
    if(store.anyBoxSelected()) {
      store.deselectBoxes()
    }
    return props.box.setSelected()
  }

  return (
    <div
      id={props.id}
      className="box"
      style={{
        backgroundColor: props.color,
        width: props.width,
        height: props.height,
        transform: `translate(${props.left}px, ${props.top}px)`,
        boxSizing: 'border-box',
        border: props.box.isSelected ? '3px solid #cc006d' : 'none'
      }}
      onClick={selectBox}
    >
      {props.children}
    </div>
  );
}

export default observer(BoxDraggable);
