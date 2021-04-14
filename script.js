// eu preciso somar as entradas
// depois somar as saídas
// a soma total será entradas menos as saídas

const Modal = function Modal() {
    document
    .querySelector('.modal-overlay')
    .classList
    .toggle('active')
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 20000,
        date: '23/01/2021',
    },]


const Transactions = {
    incomes() {
        // somar as entradas
    },
    expences() {
        // somar as saidas
    },
    total() {
        // entradas menos - saídas
    }

}

// Subistituir os dados do HTML com os dados do JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transactions, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transactions)

        DOM.transactionsContainer.appendChild(tr)

    },
    innerHTMLTransaction(transactions) {
        const cssClass = transactions.amount > 0 ? "income" : "expence"

        const amount = Utils.formatCurrency(transactions.amount)


        const html = `
        <td class="description">${transactions.description}</td>
        <td class="${cssClass}">${transactions.amount}</td>
        <td class="date">${transactions.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover Transação">
        </td>
        `

        return html
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
    }
}

transactions.forEach(function(transactions) {
    DOM.addTransaction(transactions)
})