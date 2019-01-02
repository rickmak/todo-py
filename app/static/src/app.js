import { cloneByID } from "../template.js";
import { Item } from "./model.js";

class ItemView {
  constructor(task) {
    this.task = task;
    this.onFinished = this.onFinished.bind(this);
  }

  render() {
    const el = cloneByID("item-template");
    const title = el.querySelectorAll("span")[0];
    title.textContent = this.task.name;
    this.checkbox = el.querySelectorAll("input")[0];
    this.container = el.querySelector("li");
    this.bind();
    return this.container;
  }

  bind() {
    this.checkbox.addEventListener("click", this.onFinished);
  }

  onFinished() {
    this.task.finish();
    this.container.parentNode.removeChild(this.container);
  }
}

export default class TodoApp {
  constructor(list, itemCls = ItemView) {
    this.list = list;
    this.itemCls = itemCls;
    this.appendItem = this.appendItem.bind(this);
    this.onAddClicked = this.onAddClicked.bind(this);
  }

  render(container) {
    const el = cloneByID("list-template");
    const h2 = el.querySelectorAll("h2")[0];
    h2.textContent = this.list.name;
    this.listContainer = el.querySelectorAll("ul")[0];
    this.button = el.querySelectorAll("button")[0];
    this.input = el.querySelectorAll("input")[0];
    container.appendChild(el);
    this.container = container
    this.list.map(this.appendItem);
    this.bind();
    return this.container;
  }

  bind() {
    this.button.addEventListener("click", this.onAddClicked);
  }

  appendItem(task) {
    if (task.finished) {
      return;
    }
    const item = new this.itemCls(task);
    this.listContainer.appendChild(item.render());
  }

  onAddClicked(e) {
    const content = this.input.value;
    if (content.length == 0) {
      alert("Nothing to add");
      return;
    }
    const item = new Item(content);
    this.list.addTask(item);
    this.appendItem(item);
    this.input.value = "";
  }
}
