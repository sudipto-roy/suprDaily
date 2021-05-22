class List {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.createTime = +new Date();
    this.id = this.createTime;
    this.save();
    utils.refreshDom();
  }
  save() {
    utils.saveList({
      name: this.name,
      description: this.description,
      createTime: this.createTime,
      id: this.id,
    });
  }
}

class Item {
  constructor(name, description, listId) {
    this.name = name;
    this.description = description;
    this.createTime = +new Date();
    this.id = this.createTime;
    this.listId = listId;
    utils.saveItem(
      { name, description, createTime: this.createTime, id: this.id },
      listId
    );
    utils.refreshDom();
  }
  save() {
    utils.saveItem(
      {
        name: this.name,
        description: this.description,
        createTime: this.createTime,
        id: this.id,
      },
      this.listId
    );
  }
}
