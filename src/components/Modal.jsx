import { useEffect, useState } from "react"
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from "./Mensaje"

const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto,gastoEditar,setGastoEditar,disponible,setDisponible}) => {

    const [mensaje,setMensaje] = useState('')
    const[nombre,setNombre] = useState('');
    const[cantidad,setCantidad] = useState('');
    const[categoria,setCategoria] = useState('seleccione');
    const[fecha,setFecha] = useState('');
    const[id,setId] = useState(0);
    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
           setNombre(gastoEditar.nombre);
           setCantidad(gastoEditar.cantidad);
           setCategoria(gastoEditar.categoria);
           setId(gastoEditar.id);
           setFecha(gastoEditar.fecha);
          }else{
            return;
          }
          

    },[gastoEditar])

    const handleCerrarModal = () =>{
        setModal(false);
        setAnimarModal(false);
        setGastoEditar({});
    }

    const handleSubmit = e =>{
        e.preventDefault();
        //validando que todos los campos esten llenos
        if([nombre,cantidad].includes('') || categoria === 'seleccione'){
            //en caso de que no todos los campos esten llenos
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setMensaje('');
            }, 2000);
        }else{
            
            //verificar que no exceda el limite de presupuesto disponible
            if(Number(cantidad) > Number(disponible)){
                setMensaje('El gasto excede la cantidad disponible');
                setTimeout(() => {
                    setMensaje('');
                }, 2000);
                return;

            }
            //En caso de que todos los campos esten llenos
            guardarGasto({nombre,cantidad,categoria,id,fecha});
        }

    }
    
  return (
    <>
        
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="icono-cerrar-modal"
                    onClick={handleCerrarModal} />

            </div>

            <form 
                className={`formulario ${animarModal ? "animar":'cerrar'}`}
                onSubmit={handleSubmit}
                >
                <legend>{Object.keys(gastoEditar).length > 0 ?"Editar gasto":"Nuevo gasto"}</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        type="text" 
                        id="nombre"
                        placeholder="Añade el nombre del Gasto"
                        value={ nombre} 
                        onChange={e=>setNombre(e.target.value)}/>
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        type="number" 
                        id="cantidad"
                        placeholder="Añade la cantidad del Gasto" 
                        value={cantidad}
                        onChange={e=>setCantidad(e.target.value)}/>
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select 
                        name="" 
                        id="categoria"
                        value={categoria}
                        onChange={e=>setCategoria(e.target.value)}
                    >
                        <option value="seleccione" disabled>--seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>

                    </select>
                </div>

                <input type="submit" value={Object.keys(gastoEditar).length > 0 ?"Guardar cambios":"añadir gasto"} />

                {mensaje && <Mensaje tipo="error"> {mensaje} </Mensaje> }

                
            </form>
        </div>

        
    </>
  )
}

export default Modal
