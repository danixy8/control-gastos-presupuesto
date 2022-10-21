import Swal from 'sweetalert2';

const deleteDataAlert = (
  deleteFunction, 
  title='Eliminar', 
  text='Estas seguro de eliminar', 
  textAfterDelete='Se elimino exitosamente', entity) => {
  Swal.fire({
    title: title,
    text: `${text} ${entity ? entity.name : ''}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Si, Eliminar',
    cancelButtonColor: '#d33',
    cancelButtonText:'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteFunction()
      Swal.fire({
        title: 'Operacion exitosa',
        text: textAfterDelete,
        showConfirmButton: false,
        icon: 'success',
        timer: 1000
      })
    }
  })
}

export default deleteDataAlert;