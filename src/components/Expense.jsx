import React from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from '../helpers';
import iconSavings from '../img/icono_ahorro.svg';
import iconHouse from '../img/icono_casa.svg';
import iconFood from '../img/icono_comida.svg';
import iconExpensives from '../img/icono_gastos.svg';
import iconLeisure from '../img/icono_ocio.svg';
import iconHealth from '../img/icono_salud.svg';
import iconSubs from '../img/icono_suscripciones.svg';

const dictionaryIcons = {
  ahorro: iconSavings,
  comida: iconFood,
  casa: iconHouse,
  gastos: iconExpensives,
  ocio: iconLeisure,
  salud: iconHealth,
  subscripciones: iconSubs,
}

const Expense = ({expense, setExpenseEdit, deleteExpense}) => {
  const { category, name, amount, id, date } = expense;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setExpenseEdit(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick={() => deleteExpense(id)}
        // destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img
              src={dictionaryIcons[category]}
              alt={category}
            />
            <div className='descripcion-gasto'>
              <p className='categoria'>{category}</p>
              <p className='nombre-gasto'>{name}</p>
              <p className='fecha-gasto'>
                Agregado el: {''}
                <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>

          <p className='cantidad-gasto'>${amount}</p>
        
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense