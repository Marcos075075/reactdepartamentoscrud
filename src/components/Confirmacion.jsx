import React, { Component } from 'react'
import ServiceDepartamentos from '../services/ServiceDepartamentos';
import { Navigate, NavLink } from 'react-router-dom';

export default class Confirmacion extends Component {
    service = new ServiceDepartamentos();

    state = {
        status:false,
    }
    
    eliminarDepartamento = () => {
        this.service.deleteDepartamentos(this.props.id).then(result =>{
        this.setState({
            status:true
        })
        
        })
    }
  render() {
    return (
      <div>
        {
            this.state.status == true &&
            (<Navigate to="/"/>)
        }
        <h1>¿Estas seguro de que quieres eliminarlo? Si aceptas no habra marcha atras</h1>
        <button className='btn btn-danger' onClick={() => {this.eliminarDepartamento()}}>
            Aceptar
        </button>
        <NavLink className='btn btn-warning' to={"/" + true}>
            Cancelar
        </NavLink>
      </div>
    )
  }
}
