import React, { Component } from 'react'
import ServiceHospitales from '../services/ServiceHospitales'

export default class TrabajadoresComponent extends Component {
    service = new ServiceHospitales();
    state = {
        trabajadores: []
    }

    loadTrabajadores = async () => {
        let idhospitales = this.props.idhospitales;
        let data = "";
        for (let id of idhospitales) {
            data += "idhospital=" + id + "&"
        }
        data = data.substring(0, data.length - 1);

        let datos = await this.service.getTrabajadoresHospitales(data);
        console.log(datos);
        this.setState({
            trabajadores: datos
        })
    }

    componentDidMount = async () => {
        await this.loadTrabajadores();
    }

    componentDidUpdate = async (oldProps) => {
        if (oldProps.idhospitales != this.props.idhospitales) {
            await this.loadTrabajadores();
        }
    }

    render() {
        return (
            <div>
                <h1>Trabajadores Component</h1>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Oficio</th>
                            <th>Salario</th>
                            <th>Hosptial</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.trabajadores.map((t, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{t.apellido}</td>
                                        <td>{t.oficio}</td>
                                        <td>{t.salario}</td>
                                        <td>{t.idHospital}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
