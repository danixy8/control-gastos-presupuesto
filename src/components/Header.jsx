import React from 'react'
import ControlBudget from './ControlBudget';
import NewBudget from './NewBudget';

const Header = ({
  budget, 
  setBudget,
  isValidBudget,
  setIsValidBudget,
  expenses,
  setExpenses
  }) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>

      {
        isValidBudget ? (
          <ControlBudget
            expenses={expenses}
            setExpenses={setExpenses}
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
          />
        ) : (
          <NewBudget
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
          />
        )
      }

    </header>
  )
}

export default Header