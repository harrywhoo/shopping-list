const itemForm = document.querySelector("#item-form")
const itemInput = document.querySelector("#item-input")
const itemList = document.querySelector("#item-list")


itemForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const newItem = itemInput.value
    if (newItem === ''){
        alert('Please add an item')
        return
    }

    const li = document.createElement("li")
    const txt = document.createTextNode(newItem);
    li.appendChild(txt);

    const button = document.createElement('button')
    button.className = 'remove-item btn-link text-red'

    const i = document.createElement('i');
    i.className = 'fa-solid fa-xmark'
    button.appendChild(i);

    li.appendChild(button)

    console.log(li)
    itemList.appendChild(li);

    itemInput.value = ''
})
