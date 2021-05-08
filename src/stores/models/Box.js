import { types } from "mobx-state-tree";

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
    status() {
      return self.isSelected ? true : false
    }
  }))
  .actions(self => ({
    setSelected() {
      self.isSelected = true
    },
    unsetSelected() {
      self.isSelected = false
    },
    changeColor(color) {
      self.color = color
    }
  }));

export default BoxModel;
