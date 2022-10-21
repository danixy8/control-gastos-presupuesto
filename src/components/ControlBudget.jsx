import {useEffect, useState} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import deleteDataAlert from '../utils/alerts';

const ControlBudget = ({
  expenses, 
  setExpenses,
  budget,
  setBudget,
  setIsValidBudget
}) => {

  const [available, setAvalaible] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const totalSpent = expenses.reduce((total, spent) => spent.amount + total, 0);
    
    const totalAvailable = budget - totalSpent

    //calcular porcentaje gastado
    const newPercent = (((budget - totalAvailable) / budget) * 100).toFixed(2);

    setAvalaible(totalAvailable)
    setSpent(totalSpent)
    setTimeout(() => {
      setPercent(newPercent)
    }, 1200);
  }, [expenses])
  

  const formatAmount = (amount) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  const handleResetApp = () => {

    const deleteBudgetFunction = () => {
      setExpenses([])
      setBudget(0)
      setIsValidBudget(false)
    }

    deleteDataAlert(
      deleteBudgetFunction, 
      'Eliminar presupuesto y gastos',
      'Estas seguro de eliminar el presupuesto y los gastos',
      'Presupuesto y gastos borrados'
    )
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percent > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            pathTransitionDuration: 1.5,
            textColor: percent > 100 ? '#DC2626' : '#3B82F6'
          })}
          value={percent}
          text={`${percent}% Gastado`}
        />
      </div>

      <div className='contenido-presupuesto'>
        <button 
        className='reset-app'
        type='button'
        onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatAmount(budget)}
        </p>

        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatAmount(available)}
        </p>

        <p>
          <span>Gastado: </span> {formatAmount(spent)}
        </p>
      </div>
    </div>
  )
}

export default ControlBudget