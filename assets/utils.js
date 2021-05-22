const utils = {
  getFromStorage: (key) => {
    const dataStr = localStorage.getItem(key);
    let dataArr = [];
    if (dataStr) {
      dataArr = JSON.parse(dataStr);
    }
    return dataArr;
  },
  saveInStorage: (data, key) => {
    let dataArr = utils.getFromStorage(key);
    dataArr.push(data);
    localStorage.setItem(key, JSON.stringify(dataArr));
  },
  deleteFromStorage: (dataId, key) => {
    let dataArr = utils.getFromStorage(key);
    const dataAfterDelete = dataArr.filter((el) => el.id != dataId);
    localStorage.setItem(key, JSON.stringify(dataAfterDelete));
  },
  saveList: (newListObj) => {
    utils.saveInStorage(newListObj, "lists");
  },
  saveItem: (newItemObj, listId) => {
    utils.saveInStorage(newItemObj, `${listId}_items`);
  },
  deleteList: (listId) => {
    utils.deleteFromStorage(listId, "lists");
    localStorage.removeItem(`${listId}_items`);
  },
  deleteItem: (listId, itemId) => {
    utils.deleteFromStorage(itemId, `${listId}_items`);
  },
  refreshDom: () => {
    const listsArr = utils.getFromStorage("lists");
    const listsString = listsArr.map((el) => {
      const listId = el.id;
      const itemsInListStr = utils.getAllItemsInList(listId);
      return utils.getListString(el.name, el.id, itemsInListStr);
    });
    App.$container.innerHTML = listsString.join(" ");
  },
  getItemString: (name, description, id, listId) => {
    return templates.item(name, description, id, listId);
  },
  getListString: (name, listId, itemsInListStr) => {
    return templates.list(name, listId, itemsInListStr);
  },
  getAllItemsInList: (listId) => {
    const allItems = utils.getFromStorage(`${listId}_items`);
    let allItemsStr = allItems.map((el) =>
      utils.getItemString(el.name, el.description, el.id, listId)
    );
    return `<div>${allItemsStr.join(" ")}</div>`;
  },
  getAllList: () => {
    const allLists = utils.getFromStorage("lists");
    let allListsStr = allLists.map((el) => utils.getListString(el.name));
    return `<div>${allListsStr}</div>`;
  },
  getItemFromList: (listId, itemId) => {
    const itemsArr = utils.getFromStorage(`${listId}_items`);
    return itemsArr.filter((el) => el.id == itemId)[0];
  },
};
