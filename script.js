const itemForm = document.querySelector("#item-form")
const itemInput = document.querySelector("#item-input")
const itemList = document.querySelector("#item-list")
const clearButton = document.getElementById("clear")
const filter = document.getElementById("filter")


function checkUI() {
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        clearButton.style.display = 'none'
        filter.style.display = 'none'
    }
    else {
        clearButton.style.display = 'block'
        filter.style.display = 'block'
    }
}

itemForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const newItem = itemInput.value
    if (newItem === '') {
        alert('Please add an item')
        return
    }
    addItemToDOM(newItem)
    addItemToStorage(newItem)

    itemInput.value = ''
    checkUI()
})

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
}

function addItemToStorage(item) {
    let itemsFromStorage

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []

    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    itemsFromStorage.push(item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

itemList.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains("remove-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove()
        }
    }
    checkUI()
})

clearButton.addEventListener('click', (e) => {
    while (itemList.firstChild) {
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

checkUI()