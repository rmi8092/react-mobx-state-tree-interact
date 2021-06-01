import { types } from "mobx-state-tree";
import store from "../MainStore";

const BoxModel = types
  .model("Box", {
    id: types.identifier,
    width: 200,
    height: 100,
    color: "#FFF000",
    left: 200,
    top: 100,
    isSelected: false
  })
  .views(self => ({
    isSelectedStatus() {
      return self.isSelected ? true : false
    }
  }))
  .actions(self => ({
    setSelected() {
      self.isSelected = true
      store.boxesSelectedCounter()
    },
    unsetSelected() {
      self.isSelected = false
      store.boxesSelectedCounter()
    },
    changeColor(color) {
      self.color = color
    },
    setPosition(x, y) {
      self.left = x
      self.top = y
    }
  }));

export default BoxModel;
