import React, { Component } from 'react'
import ServiceDepartamentos from '../services/ServiceDepartamentos'
import { Navigate } from 'react-router-dom';

export default class CreateDepartamento extends Component {
    service = new ServiceDepartamentos();

    cajaNumero = React.createRef();
    cajaNombre = React.createRef();
    cajaLocalidad = React.createRef();

    state = {
        mensaje: null,
        status: false
    }

    insertarDepartamento = (e) => {
        e.preventDefault();

        let departamento = {
            numero: parseInt(this.cajaNumero.current.value),
            nombre: this.cajaNombre.current.value,
            localidad: this.cajaLocalidad.current.value
        }

        this.service.insertDepartamento(departamento).then(respuesta => {
            this.setState({
                status: true
            })
        }).catch(error => {
            this.setState({
                mensaje: error.message
            })
        })
    }

    render() {
        if (this.state.status == true) {
            return (<Navigate to="/"/>)
        } else
        {return (
            <div style={{ margin: "auto", width: "50%", marginTop: "1%" }}>
                {
                    this.state.mensaje &&
                    (
                        <p style={{color: "red", fontWeight: "bold" }}>
                            {this.state.mensaje}
                        </p>
                    )
                }
                <form onSubmit={this.insertarDepartamento}>
                    <label>Introduce id</label>
                    <input type="number" ref={this.cajaNumero} className='form-control' required />
                    <label>Introduce nombre</label>
                    <input type="text" ref={this.cajaNombre} className='form-control' required/>
                    <label>Introduce localidad</label>
                    <input type="text" ref={this.cajaLocalidad} className='form-control' required/>
                    <button className='btn btn-success' style={{ marginTop: "0.8%" }}>
                        Insertar departamento
                    </button>
                </form>
            </div>
        )}
    }
}
