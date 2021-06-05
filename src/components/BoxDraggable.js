import React, {useRef, useEffect} from "react";
import { observer } from "mobx-react";
import interact from "interactjs";
import store from "../stores/MainStore";

function BoxDraggable(props) {
  const ref = useRef(props.id)
  let newX
  let newY
  
  useEffect(() => {
    interact(ref.current)
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ],
        listeners: {
          move: dragBox,
          end: endDragBox
        }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectBox = () => {
    return props.box.setSelected()
  }
  
  const deselectBox = () => {
    return props.box.unsetSelected()
  }

  const handleClick = () => {
    props.box.isSelectedStatus() ? deselectBox() : selectBox()
  }

  function dragBox(event) {
    ref.current = event.target
    const dataX = ref.current.getAttribute('data-x')
    const dataY = ref.current.getAttribute('data-y')
    const initialX = parseFloat(dataX) || 0;
    const initialY = parseFloat(dataY) || 0;
    const deltaX = event.dx;
    const deltaY = event.dy;
    newX = initialX + deltaX;
    newY = initialY + deltaY;
    ref.current.style.transform = `translate(${newX}px, ${newY}px)`;
    ref.current.setAttribute('data-x', newX);
    ref.current.setAttribute('data-y', newY);
  }

  function endDragBox() {
    store.setPositionByBoxId(ref.current.id, newX, newY)
  }

  function boxShadowStyle() {
    return props.box.isSelected ? '0 2px 20px rgba(0,0,0,0.19), 0 0 6px rgba(0,0,0,0.40)' : 'none'
  }

  function getDynamicStyles() {
    return {
      backgroundColor: props.color,
      width: props.width,
      height: props.height,
      transform: `translate(${props.left}px, ${props.top}px)`,
      boxSizing: 'border-box',
      boxShadow: boxShadowStyle()
    }
  }

  return (
    <div
      id={props.id}
      className="box"
      style={getDynamicStyles()}
      onClick={handleClick}
      ref={ref}
      data-x={props.left}
      data-y={props.top}
    >
      {props.children}
    </div>
  );
}

export default observer(BoxDraggable);
