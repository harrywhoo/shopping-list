const itemForm = document.querySelector("#item-form")
const itemInput = document.querySelector("#item-input")
const itemList = document.querySelector("#item-list")
const clearButton = document.getElementById("clear")
const filter = document.getElementById("filter")
const formBtn = document.querySelector('button')
let isEditMode = false

function displayItems() {
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach((item) => addItemToDOM(item))
}
function checkUI() {
    const items = itemList.querySelectorAll('li')
    if (isEditMode) {
        filter.style.display = 'none'
    }
    if (items.length === 0) {
        clearButton.style.display = 'none'
        filter.style.display = 'none'
    }
    else {
        clearButton.style.display = 'block'
        filter.style.display = 'block'
    }
}
window.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'LI' ||
        e.target.id === 'item-input') {
        return
    }
    if (isEditMode) {
        formBtn.innerHTML = `<i class="fa-solid fa-plus"></i>
                Add Item`
        formBtn.style.backgroundColor = "#333"
        itemInput.value = ''
        itemList.querySelectorAll("li").forEach((i) => {
            i.classList.remove('edit-mode')
        })
        isEditMode = false
    }

})
itemForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const newItem = itemInput.value
    if (newItem === '') {
        swal.fire({
            text: "Empty Item",
            icon: "error",
            background: "#f5f5f5",
            confirmButtonColor: "#228B22",
        });
        return
    }
    if (isEditMode) {
        const currItem = itemList.querySelector(".edit-mode")
        deleteItemFromStorage(currItem.textContent)
        itemList.removeChild(currItem)
        isEditMode = false
    }
    else {
        if (checkItemExists(newItem)) {
            swal.fire({
                text: "Item already exists",
                icon: "error",
                background: "#f5f5f5",
                confirmButtonColor: "#228B22",
            });
            return
        }
    }
    addItemToDOM(newItem)
    addItemToStorage(newItem)
    formBtn.innerHTML = `<i class="fa-solid fa-plus"></i>
    Add Item`
    formBtn.style.backgroundColor = "#333"
    itemInput.value = ''

})

function checkItemExists(item) {
    let itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item)
}
function addItemToDOM(item) {
    const li = document.createElement("li")
    const txt = document.createTextNode(item);
    li.appendChild(txt);

    const button = document.createElement('button')
    button.className = 'remove-item btn-link text-red'

    const i = document.createElement('i');
    i.className = 'fa-solid fa-xmark'
    button.appendChild(i);

    li.appendChild(button)

    itemList.appendChild(li);
    checkUI()
}
function deleteItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    if (!itemsFromStorage.includes(item)) {
        return
    }
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.push(item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []

    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    return itemsFromStorage
}
itemList.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains("remove-item")) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#228B22",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                deleteItemFromStorage(e.target
                    .parentElement
                    .parentElement
                    .textContent)
                e.target.parentElement.parentElement.remove()
            }
            checkUI()
        });
    }
    else if (e.target.tagName === 'LI') {
        setItemToEdit(e.target)
    }
    checkUI()
})

function setItemToEdit(item) {
    isEditMode = true
    itemList.querySelectorAll("li").forEach((i) => {
        i.classList.remove('edit-mode')
    })
    item.classList.add('edit-mode')
    formBtn.innerHTML = `<i class="fa-solid fa-pen"></i>
    Update Item`
    formBtn.style.backgroundColor = "#228B22"
    itemInput.value = item.textContent
    checkUI()
}
clearButton.addEventListener('click', (e) => {
    if (isEditMode) {
        swal.fire({
            text: "Finish edit first",
            background: "#f5f5f5",
            confirmButtonColor: "#228B22",
        });
        return
    }
    while (itemList.firstChild) {
        deleteItemFromStorage(itemList.firstChild.textContent)
        itemList.removeChild(itemList.firstChild)
    }
    checkUI()
})

filter.addEventListener('input', (e) => {

    const text = e.target.value.toLowerCase()
    const items = itemList.querySelectorAll('li')
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase()
        if (!itemName.includes(text)) {
            item.style.display = 'none'
        } else {
            item.style.display = 'flex'
        }
    })
})

document.addEventListener('DOMContentLoaded', displayItems)
checkUI()