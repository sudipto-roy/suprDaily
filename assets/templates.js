const templates = {
  list: (
    name,
    listId,
    itemsInListStr
  ) => `<div class="list" data-id="${listId}" ondragover="App.preventDefault(event)" ondrop="App.drop(event)">
    <header class="spreadHR">
      <h2>${name}</h2>
      <div class="flexRight">
        <button data-id="${listId}"  onclick="App.handleAddItemClick(event)">+</button>
        <button class="" data-id="${listId}" onclick="App.handleDeleteList(event)">X</button>
      </div>
    </header>
    <div class="listBody">
    ${itemsInListStr}
    </div>
  </div>`,
  item: (
    name,
    description,
    itemId,
    listId
  ) => `<div class="listItem" data-id="${itemId}" data-list-id="${listId}" draggable="true" ondragstart="App.drag(event)">
    <h3 class="spreadHR">
        ${name}
        <button class="flexRight" data-list-id="${listId}" data-id="${itemId}" onclick="App.handleDeleteItem(event)">X</button>
    </h3>
    <p>${description}</p>
  </div>`,
  createListModal: () => `<div class="modalBG">
    <div class="modalWrap">
        <form onsubmit="App.handleListFormSubmit(event)">
        <div>
            <input name="listName" type="text" placeholder="Name of list" required />
        </div>
        <br />
        <div class="spreadHR">
            <button type="submit">Create List</button>
            <button type="button" onclick="App.closeModal()">Close</button>
        </div>
        </form>
    </div>
  </div>`,
  createItemModal: (listId) => `<div class="modalBG">
    <div class="modalWrap">
        <form data-id="${listId}" onsubmit="App.handleItemFormSubmit(event)">
        <div>
            <input name="itemName" type="text" placeholder="Name of item" required />
        </div>
        <br />
        <div>
            <input name="itemDesc" type="text" placeholder="Description" required />
        </div>
        <br />
        <div class="spreadHR">
            <button type="submit">Create Item</button>
            <button type="button" onclick="App.closeModal()">Close</button>
        </div>
        </form>
    </div>
  </div>`,
};
