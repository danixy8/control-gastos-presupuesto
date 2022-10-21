import { useState, useEffect } from 'react'
import Header from './components/header'
import BudgetList from './components/BudgetList'
import Modal from './components/Modal'
import { generateId } from './helpers'
import IconNewExpense from './img/nuevo-gasto.svg'
import deleteDataAlert from './utils/alerts'
import Filters from './components/Filters'

function App() {
  const expensesInitial = () => JSON.parse(localStorage.getItem('expenses')) || [];
  const [expenses, setExpenses] = useState(expensesInitial);

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget') ?? 0)
  );
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [expenseEdit, setExpenseEdit] = useState({});

  const [filter, setFilter] = useState('');
  const [expensesFilter, setExpensesFilter] = useState([]);

  useEffect(() => {
    if(Object.keys(expenseEdit).length > 0){
      handleNewExpense()
    }
  }, [expenseEdit])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])
  
  useEffect(() => {
    if(filter){
      const expensesFiltered = expenses.filter(expense => expense.category === filter)
      setExpensesFilter(expensesFiltered)
    }
  }, [filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget') ?? 0)

    if(budgetLS > 0){
      setIsValidBudget(true)
    }
  }, [])


  const handleNewExpense = () => {
    setModal(true)
    
    setTimeout(() => {
      setAnimateModal(true)
    }, 400)
  }

  const saveExpense = expense => {
    if(expense.id){
      const updatedExpenses = expenses.map(expenseState => expense.id === expenseState.id ? expense : expenseState)
      setExpenses(updatedExpenses);
      setExpenseEdit({});
    }else{
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense])
    }

    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 400);
  }

  const deleteExpense = id => {

    const filterExpense = expenses.filter(expense => expense.id === id)

    const deleteExpenseFunction = () => {
      const filterDeleteExpense = expenses.filter(expense => expense.id !== id)
      setExpenses(filterDeleteExpense)
    }

    deleteDataAlert(
      deleteExpenseFunction, 
      'Eliminar Gasto',
      'Estas seguro de eliminar el gasto',
      'El gasto se elimino exitosamente',
      filterExpense[0]
    )
    
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        budget={budget}
        setExpenses={setExpenses}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        expenses={expenses}
      />

      {isValidBudget && (
        <>
          <main>
            <Filters
              filter={filter}
              setFilter={setFilter}
            />
            <BudgetList 
              expenses={expenses}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
              filter={filter}
              expensesFilter={expensesFilter}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconNewExpense}
              alt="icon new expense"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}

      {modal && <Modal 
                  setModal={setModal} 
                  animateModal={animateModal}
                  setAnimateModal={setAnimateModal}
                  saveExpense={saveExpense}
                  expenseEdit={expenseEdit}
                  setExpenseEdit={setExpenseEdit}
                  />}

    </div>
  )
}

export default App
