import { cloneByID } from "../template.js";

export default class TodoArchive {
  constructor(list) {
    this.list = list;
    this.appendItem = this.appendItem.bind(this);
    this.onToggleClicked = this.onToggleClicked.bind(this);
  }

  render(container) {
    this.container = container;
    this.listContainer = this.container.querySelector("ul");
    this.toggleBtn = this.container.querySelector("button");
    this.list.map(this.appendItem);
    this.bind();
    return this.container;
  }

  bind() {
    this.toggleBtn.addEventListener("click", this.onToggleClicked);
  }

  onToggleClicked() {
    const opacity = window.getComputedStyle(this.listContainer).opacity;
    if (opacity === "0") {
      this.toggleBtn.textContent = "Hide finished";
    } else {
      this.toggleBtn.textContent = "Show finished";
    }
    this.listContainer.classList.toggle("show");
    this.listContainer.classList.toggle("hide");
  }

  appendItem(task) {
    if (!task.finished) {
      return;
    }
    const el = cloneByID("finished-template");
    el.querySelector("span").textContent = task.name;
    this.listContainer.appendChild(el);
  }
}
