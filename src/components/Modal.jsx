import {useState, useEffect} from 'react'
import CloseBtn from '../img/cerrar.svg'
import Message from './Message';

const Modal = ({
  setModal, 
  animateModal, 
  setAnimateModal, 
  saveExpense,
  expenseEdit,
  setExpenseEdit
}) => {

  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if(Object.keys(expenseEdit).length > 0){
      setName(expenseEdit.name)
      setAmount(expenseEdit.amount)
      setCategory(expenseEdit.category)
      setId(expenseEdit.id)
      setDate(expenseEdit.date)
    }
  }, [expenseEdit])
  

  const hideModal = () => {
    
    setAnimateModal(false)
    setExpenseEdit({})
    
    setTimeout(() => {
      setModal(false)
    }, 400);
  }

  const handleSubmit = e =>{
    e.preventDefault()

    if([name, amount, category].includes('')){
      setMessage('Todos los campos son obligatorios')

      setTimeout(() => {
        setMessage('')
      }, 3000);
      return;
    }

    saveExpense({name, amount, category, id, date})

  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img
          src={CloseBtn}
          alt="cerrar modal"
          onClick={hideModal}
        />
      </div>

      <form 
        onSubmit={handleSubmit}
        className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
        >
        <legend>{expenseEdit.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

        {message && <Message type="error">{message}</Message>}

        <div className='campo'>
          <label htmlFor='name'>Nombre Gasto</label>

          <input
            id="name"
            value={name}
            type="text"
            placeholder="Añade un nuevo gasto"
            onChange={ e => setName(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='amount'>Cantidad</label>

          <input
            id="amount"
            value={amount}
            type="number"
            placeholder="Añade la cantidad del gasto: ej: 300"
            onChange={e => setAmount(Number(e.target.value))}
          />
        </div>

        <div className='campo'>
          <label htmlFor='category'>Categoria</label>

          <select
            id='category'
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="subscripciones">Subscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={expenseEdit.name ? 'Guardar Cambios' : 'Añadir Gasto'}
        />

      </form>
    </div>
  )
}

export default Modal