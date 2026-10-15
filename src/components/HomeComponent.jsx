import React, { Component } from 'react'
import loading from "../assets/images/loading.png"
import ServiceDepartamentos from '../services/ServiceDepartamentos'
import { NavLink } from 'react-router-dom';

export default class HomeComponent extends Component {
    service = new ServiceDepartamentos();

    state = {
        status: false,
        departamentos: []
    }

    loadDepartamentos = () => {
        this.service.getDepartamentos().then((result) => {
            this.setState({
                departamentos: result,
                status: true
            })
        })
    }

    // eliminarDepartamento = (id) => {
    //     this.service.deleteDepartamentos(id).then(result =>{
    //         this.loadDepartamentos();
    //     })
    // }

    componentDidMount = () => {
        if (this.props.cancel == true) {
            console.log("Se ha cancelado");
        } else{
        this.loadDepartamentos();
        }
    }
    render() {
        if (this.state.status == true) {
            return (
                <div style={{ margin: "auto", width: "50%", marginTop: "1%" }}>
                    <table className="table table-default table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Localidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.departamentos.map((dept, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{dept.nombre}</td>
                                            <td>{dept.localidad}</td>
                                            <td>
                                                <NavLink className="btn btn-info"
                                                    to={"/update/" + dept.numero
                                                        + "/" + dept.nombre
                                                        + "/" + dept.localidad}>
                                                    edit
                                                </NavLink>
                                            </td>
                                            <td>
                                                <NavLink className="btn btn-danger" to={"/confirmacion/" + dept.numero}>Eliminar</NavLink>
                                                {/* <button onClick={() => {this.eliminarDepartamento(dept.numero)}} className="btn btn-danger">Eliminar</button> */}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (<img src={loading} alt='loading...' />)
        }
    }
}
