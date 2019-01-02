export class Item {
  constructor(name) {
    this.name = name;
    this.finished = false;
    this.birth = new Date();
  }

  finish() {
    this.finished = true;
    this.container.save();
  }

  remove() {
    if (this.container.list.indexOf(this) != 1) {
      this.container.list.splice(this.container.list.indexOf(this), 1);
    }
  }

  static restore(obj) {
    const inst = new this(obj.name);
    inst.finished = obj.finished;
    inst.birth = obj.birth;
    return inst;
  }
}

export class List {
  constructor(name) {
    this.name = name;
    this.list = [];
  }

  addTask(item) {
    item.container = this;
    this.list.push(item);
    this.save();
  }

  map(func) {
    this.list.map(func);
  }

  load() {
    var plainList = JSON.parse(localStorage.getItem(this.name) || "[]");
    this.list = [];
    for (var i = 0; i < plainList.length; i++) {
      var item = Item.restore(plainList[i]);
      item.container = this;
      this.list.push(item);
    }
    return this;
  }

  save() {
    var plainList = [];

    for (var i = 0; i < this.list.length; i++) {
      plainList.push({
        name: this.list[i].name,
        finished: this.list[i].finished,
        birth: this.list[i].birth
      });
    }

    localStorage.setItem(this.name, JSON.stringify(plainList));
    return this;
  }
}
