import { types, getSnapshot } from "mobx-state-tree";
import { UndoManager } from "mst-middlewares"

import uuid from "uuid/v4";

import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
  })
  .actions(self => {
    setUndoManager(self)
    return {
      addBox(box) {
        self.boxes.push(box);
      },
      removeBox() {
        self.boxes = self.boxes.filter(box => !box.isSelected)
      },
      deselectBoxes() {
        self.boxes.map(box => box.unsetSelected())
      },
      applyColorToSelectedBox(color) {
        self.boxes.forEach(box => {
          if(box.isSelected) {
            box.changeColor(color)
            return
          }
        })
      },
      setPositionByBoxId(boxId, newX, newY) {
        self.boxes.forEach(box => {
          if(box.id === boxId) {
            box.setPosition(newX, newY)
            return
          }
        })
      },
      saveState() {
        localStorage.setItem('boxesStore', JSON.stringify(getSnapshot(self)))
      },
      clearState() {
        self.boxes = []
        localStorage.removeItem('boxesStore')
      }
    };
  })
  .views(self => ({
    boxesSelectedCounter() {
      let counter = 0
      self.boxes.forEach(box => {
        if(box.isSelected) {
          counter = counter + 1
        }
      })
      return counter
    },
    getSelectedBox() {
      self.boxes.forEach(box => {
        if(box.isSelected) {
          return box
        }
      })
    }
  }));

export let undoManager = {}
export const setUndoManager = (targetStore) => {
  undoManager = UndoManager.create({}, { targetStore })
}

const box1 = BoxModel.create({
  id: uuid(),
  color: getRandomColor(),
  left: 0,
  top: 0
});

let initialState = {
  boxes: [ box1 ]
}

if(localStorage.getItem('boxesStore')) {
  const json = JSON.parse(localStorage.getItem('boxesStore'))
  if(MainStore.is(json))  initialState = json
}

const store = MainStore.create(initialState);

export default store;
