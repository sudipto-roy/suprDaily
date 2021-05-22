const App = (function () {
  // cache dom
  const $container = document.getElementById("container");
  const $addListBtn = document.getElementById("addList");
  const $modalTarget = document.getElementById("modalTarget");

  // add event listener
  $addListBtn.addEventListener("click", handleAddListClick);

  function closeModal() {
    $modalTarget.innerHTML = "";
  }

  function handleAddListClick() {
    $modalTarget.innerHTML = templates.createListModal();
  }

  function handleListFormSubmit(e) {
    e.preventDefault();
    const listName = e.target.querySelector("input").value;
    new List(listName);
    closeModal();
  }

  function handleAddItemClick(e) {
    const listId = e.target.getAttribute("data-id");
    $modalTarget.innerHTML = templates.createItemModal(listId);
  }

  function handleItemFormSubmit(e) {
    e.preventDefault();
    const listId = e.target.getAttribute("data-id");
    const itemName = e.target.querySelector("input[name='itemName']").value;
    const itemDesc = e.target.querySelector("input[name='itemDesc']").value;
    new Item(itemName, itemDesc, listId);
    closeModal();
  }

  function handleDeleteItem(e) {
    const itemId = e.target.getAttribute("data-id");
    const listId = e.target.getAttribute("data-list-id");
    utils.deleteItem(listId, itemId);
    utils.refreshDom();
  }

  function handleDeleteList(e) {
    const listId = e.target.getAttribute("data-id");
    utils.deleteList(listId);
    utils.refreshDom();
  }

  function preventDefault(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const prevListId = e.dataTransfer.getData("listId");
    const newListId = e.currentTarget.getAttribute("data-id");
    const itemObj = utils.getItemFromList(prevListId, itemId);
    utils.saveItem(itemObj, newListId);
    utils.deleteItem(prevListId, itemId);
    utils.refreshDom();
  }

  function drag(e) {
    e.dataTransfer.setData("itemId", e.target.getAttribute("data-id"));
    e.dataTransfer.setData("listId", e.target.getAttribute("data-list-id"));
  }

  return {
    $container,
    handleAddItemClick,
    handleListFormSubmit,
    handleItemFormSubmit,
    handleDeleteItem,
    closeModal,
    drop,
    drag,
    preventDefault,
    handleDeleteList,
  };
})();
