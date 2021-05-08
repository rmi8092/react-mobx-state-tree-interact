import { types } from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel)
  })
  .actions(self => {
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
      }
    };
  })
  .views(self => ({
    anyBoxSelected() {
      self.boxes.forEach(box => {
        if(box.isSelected) {
          return true
        }
      })
    },
    getSelectedBox() {
      self.boxes.forEach(box => {
        if(box.isSelected) {
          return box
        }
      })
    }
  }));

const store = MainStore.create();

const box1 = BoxModel.create({
  id: uuid(),
  color: getRandomColor(),
  left: 0,
  top: 0
});

store.addBox(box1);

export default store;
