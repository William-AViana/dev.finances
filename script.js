// eu preciso somar as entradas
// depois somar as saídas
// a soma total será entradas menos as saídas

const Modal = function Modal() {
    document
    .querySelector('.modal-overlay')
    .classList
    .toggle('active')
}

// const transactions = [
//     {
//         description: 'Luz',
//         amount: -50001,
//         date: '23/01/2021',
//     },
//     {
//         description: 'Website',
//         amount: 500000,
//         date: '23/01/2021',
//     },
//     {
//         description: 'Internet',
//         amount: -20015,
//         date: '23/01/2021',
//     },
//     {
//         description: 'App',
//         amount: 200000,
//         date: '23/01/2021',
//     },]

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transaction) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transaction))
    }
}

const Transactions = {
    all: Storage.get(), // atalho para const transactions, antes da const Storage ser criada

    add(transaction){
        Transactions.all.push(transaction)
        
        App.reload()
    },

    remove(index) {
        Transactions.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let income = 0
        // pegar todas as transações
        Transactions.all.forEach(transaction => {
            // verificar se a transação é maior que zero
            // e somar a uma variável e retornar essa variável
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;
    },

    expences() {
        let expense = 0
        Transactions.all.forEach(transaction => {
            if(transaction.amount < 0 ) {
                expense +=transaction.amount;
            }
        })
        return expense;
    },

    total() {
        return Transactions.incomes() + Transactions.expences()
    }
}

// Subistituir os dados do HTML com os dados do JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)


        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transactions.remove(${index})" src="./assets/minus.svg" alt="Remover Transação">
        </td>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transactions.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transactions.expences())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transactions.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ''
    }
}

const Utils = {
    formatAmount(value) {
        value = Number(value) * 100

        return Math.round(value)
    },

    formatDate(date) {
        const splitedDate = date.split("-")

        return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        
        // expressão regular para pegar somente números
        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        })

        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateField() {
        const { description, amount, date } = Form.getValues()
        if(description.trim() === "" || 
        amount.trim() === "" || 
        date.trim() === "") {
            throw new Error("Por favor preencha todos os campos")
        }
    },

    formatValues() {
        let {description, amount, date} = Form.getValues()
        
            amount = Utils.formatAmount(amount)

            date = Utils.formatDate(date)

            return {
                description,
                amount,
                date
            }
    },
    
    saveTransaction(transaction) {
        Transactions.add(transaction)
    },

    clearFields() {
        Form.description.value = ''
        Form.amount.value = ''
        Form.date.value = ''
    },

    submit(event) {
        event.preventDefault()


        try {
        // verificar se todas as informações foram preenchidas
        Form.validateField()
        // formatar os dados para salvar
        const transaction = Form.formatValues()
        // salvar
        Form.saveTransaction(transaction)
        // apagar os dados do formulário
        Form.clearFields()
        // fechar modal
        Modal()
        
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {

        Transactions.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index)
        })
        
        DOM.updateBalance()
        
        Storage.set(Transactions.all)
    },
    
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()
