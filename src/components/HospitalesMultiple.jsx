import React, { Component } from 'react'
import ServiceHospitales from '../services/ServiceHospitales';
import TrabajadoresComponent from './TrabajadoresComponent';

export default class HospitalesMultiple extends Component {
    service = new ServiceHospitales();

    selectHospital = React.createRef();

    state = {
        hospitales: [],
        hospitalesSeleccionados: []
    }

    loadHospitales = async () => {
        let datos = await this.service.getHospitales();
        this.setState({
            hospitales: datos
        })
    }

    componentDidMount = async () => {
        await this.loadHospitales();
    }

    getHospitalsesSeleccionados = (e) =>{
        e.preventDefault();
        
        let aux = [];
        let options = this.selectHospital.current.options;
        for(let option of options){
            if (option.selected) {
                aux.push(option.value);
            }
        }
        console.log(aux);
        this.setState({
            hospitalesSeleccionados: aux
        })
        
    }

    render() {
        return (
            <div>
                <h1>Hospitales Multiples</h1>
                <form>
                    <label>Seleccion Hospitales</label>
                    <select className='form-select' ref={this.selectHospital} size={6} multiple>
                        {
                            this.state.hospitales.map((hospital, index) => {
                                return (<option key={index} value={hospital.idHospital}>
                                    {hospital.nombre}
                                </option>)
                            })
                        }
                    </select>
                    <button onClick={this.getHospitalsesSeleccionados} className='btn btn-info'>
                        Mostrar Trabajadores
                    </button>
                </form>
                {
                    this.state.hospitalesSeleccionados.length != 0 &&
                    (<TrabajadoresComponent idhospitales={this.state.hospitalesSeleccionados}/>)
                }
            </div>
        )
    }
}
