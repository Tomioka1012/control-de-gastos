import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto,setPresupuesto,isValidPresupuesto,setIsValidPresupuesto}) => {

    const [mensaje,setMensaje] = useState('');
   

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        //validando que presupuesto solo sea un número entero
        if(!(/^\d+$/.test(presupuesto)) || presupuesto <= 0){
            setMensaje('Cantidad no válida');
        }else{
            setMensaje('');
            setIsValidPresupuesto(true);
            console.log(typeof presupuesto);
            
        }

    }
  return (
    <>
        <div className="contenedor-presupuesto contenedor sombra">
            <form action="" className="formulario">
                <div className="campo">
                    <label htmlFor="">Definir presupuesto</label>
                    <input 
                        type="number" 
                        className="nuevo-presupuesto"
                        placeholder="Añade tu presupuesto" 
                        value={presupuesto}
                        onChange={e => setPresupuesto(Number(e.target.value))}/>
                </div>
                <input 
                    type="submit" 
                    value="Añadir"
                    onClick={handleSubmit} />

                {mensaje && <Mensaje tipo="error"> {mensaje} </Mensaje> }
            </form>
            
        </div>
        
    </>
  )
}

export default NuevoPresupuesto