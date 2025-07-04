const formAdd = document.getElementById('form-add')
const inputItem = document.getElementById('input-item')
const listItems = document.getElementById('list-items')
const btnClear = document.getElementById('btn-clear')

const inputFilter = document.getElementById('input-filter')
const btnSearch = document.getElementById('btn-search')

let items = []

// get data from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const data = localStorage.getItem('listaCompras')
    if (data) {
        items = JSON.parse(data)
        renderList()
    }
})

function saveData() {
    // armazenamento temporário na máquina do cliente
    localStorage.setItem('listaCompras', JSON.stringify(items))
}

function renderList(status) {
    listItems.innerHTML = ''
    counter()

    items.forEach((item, index) => {
        if (status && item.status !== status) return
        // li
        const li = document.createElement('li')
        const span = document.createElement('span')
        span.innerText = item.name
        li.appendChild(span)

        const divFilterAndTrash = document.createElement('div')
        divFilterAndTrash.className = 'filterAndTrash'

        // select bought or pending
        const select = document.createElement('select')
        select.classList.add(item.status)
        select.name = 'status'

        const bought = document.createElement('option')
        bought.value = 'comprado'
        bought.innerText = 'Comprado'
        bought.className = 'comprado'

        const pending = document.createElement('option')
        pending.value = 'pendente'
        pending.innerText = 'Pendente'
        pending.className = 'pendente'

        // Marcar a opção atual
        if (item.status === 'comprado') {
            bought.selected = true
        } else {
            pending.selected = true
        }


        select.appendChild(bought)
        select.appendChild(pending)

        // action on select
        select.addEventListener('change', () => {
            items[index].status = select.value
            saveData()

            // select.classList.remove('pendente', 'comprado')
            // select.classList.add(select.value)

            renderList()
        })

        // remove button
        const removeBtn = document.createElement('button')
        removeBtn.className = 'trash'
        const trashIcon = document.createElement('i')
        trashIcon.className = 'fa-solid fa-trash'

        removeBtn.appendChild(trashIcon);
        removeBtn.addEventListener('click', () => {
            removeItem(index)
        })


        divFilterAndTrash.appendChild(select);
        divFilterAndTrash.appendChild(removeBtn);

        li.appendChild(divFilterAndTrash);
        listItems.appendChild(li);
    })
}

formAdd.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const newItem = inputItem.value.trim()
    if (newItem === '') return
    items.push({ name: newItem, status: 'pendente' })
    saveData()
    renderList()
    inputItem.value = ''
})

function removeItem(index) {
    if (confirm(`Voce realmente deseja excluir o "${items[index].name} da sua lista?"`)) {
        items.splice(index, 1)
        saveData()
        renderList()
    }
}

btnClear.addEventListener('click', () => {
    if (confirm('Deseja realmente limpar toda a lista?')) {
        items = []
        saveData()
        renderList()
    }
})

function counter() {
    const countSpan = document.getElementById('count')
    countSpan.innerText = `(${items.length})`
}

function filter() {
    const value = inputFilter.value.trim().toLowerCase();
    const clear = () => inputFilter.value = ''

    console.log(inputFilter.value.toLowerCase())

    if (value === 'comprado' || value === 'pendente') {
        clear()
        renderList(value)
    } else {
        clear()
        inputFilter.placeholder = "Esse status não existe! Tente 'Comprado' ou 'Pendente'"
        renderList()
    }
}

const orderSelect = document.querySelector('.order-select')
const aZ = document.querySelector('.a-z')
const zA = document.querySelector('.z-a')
const compradoOrder = document.querySelector('.comprado-order')
const pendenteOrder = document.querySelector('.pendente-order')

const selectedValue = orderSelect.value

// Marcar a opção atual
switch (selectedValue) {

}


select.appendChild(bought)
select.appendChild(pending)

// action on select
select.addEventListener('change', () => {
    items[index].status = select.value
    saveData()

    // select.classList.remove('pendente', 'comprado')
    // select.classList.add(select.value)

    renderList()
})



function order(orderOption) {
    switch (orderOption.value) {
        case 'a-z':
            items.sort((a, b) => a.name.localeCompare(b.name))
            break
        case 'z-a':
            items.sort((a, b) => b.name.localeCompare(a.name))
            break
        case 'comprado':
            items.sort((a, b) => a.status.localeCompare(b.status))
            break
        case 'pendente':
            items.sort((a, b) => b.status.localeCompare(a.status))
    }

    renderList()
}

btnSearch.addEventListener('click', () => filter())



// Marcar como comprado - Salvar esse Estado no localStorage ✅
// Contador de Itens - Mostras quantos items tem na lista, atualizando em tempo real ✅
// Adicione filtros para items 'comprados' e 'pendentes' ✅
// Permita ordenar alfabeticamente ou por status 