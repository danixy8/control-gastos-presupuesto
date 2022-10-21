import React from 'react'
import Expense from './Expense'

const BudgetList = ({
  expenses, 
  setExpenseEdit, 
  deleteExpense,
  filter,
  expensesFilter
}) => {
  return (
    <div className='listado-gastos contenedor'>

      {
        filter ? (
            <>
              <h2>{expensesFilter.length ? 'Gastos Filtrados' : 'No Hay Gastos'}</h2>
              {
                expensesFilter.map(expense => (
                  <Expense 
                    key={expense.id} 
                    expense={expense}
                    setExpenseEdit={setExpenseEdit}
                    deleteExpense={deleteExpense}
                  />
                ))
              }
            </>
        ) : (
          <>
            <h2>{expenses.length ? 'Gastos' : 'No Hay Gastos aun'}</h2>
            {
              expenses.map(expense => (
                <Expense 
                  key={expense.id} 
                  expense={expense}
                  setExpenseEdit={setExpenseEdit}
                  deleteExpense={deleteExpense}
                />
              ))
            }
          </>
        )
      }

    </div>
  )
}

export default BudgetList