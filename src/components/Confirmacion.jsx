import React, { Component } from 'react'
import ServiceDepartamentos from '../services/ServiceDepartamentos';
import { Navigate } from 'react-router-dom';

export default class Confirmacion extends Component {
    service = new ServiceDepartamentos();

    state = {
        status:false,
        status2:false
    }
    
    eliminarDepartamento = () => {
        this.service.deleteDepartamentos(this.props.id).then(result =>{
        this.setState({
            status:true
        })
        
        })
    }

    cancelar = () => {
        this.setState({
            status: true
        })
    }

  render() {
    return (
      <div>
        {
            this.state.status == true &&
            (<Navigate to="/" />)
        }
        <h1>¿Estas seguro de que quieres eliminarlo? Si aceptas no habra marcha atras</h1>
        <button className='btn btn-danger' onClick={() => {this.eliminarDepartamento()}}>
            Aceptar
        </button>
        <button className='btn btn-warning' onClick={() => {this.cancelar()}}>
            Cancelar
        </button>
      </div>
    )
  }
}
