import {  useState,useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto,gastos,disponible,setDisponible,setPresupuesto,setIsValidPresupuesto,setGastos}) => {

    const [porcentaje,setPorcentaje] = useState(0);
    //const[disponible,setDisponible] = useState(0);
    const[gastado,setGastado] = useState(0);
    //useefect para el calculo de los gastos
    useEffect(()=>{
        const totalGastado = gastos.reduce((total,gasto) => Number(gasto.cantidad) + total , 0);
        setGastado(totalGastado);
        const totalDisponible = presupuesto - totalGastado;
        setDisponible(totalDisponible);
        //calcular el porcentaje gastado
        const nuevoPorcentaje = Number((((presupuesto-totalDisponible)/presupuesto) * 100).toFixed(2));
        setPorcentaje(nuevoPorcentaje);
        
        

    },[gastos]);
   

    const formatearCantidad = (cantidad) =>{
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        }

        );

    }

    const handleResetearApp = () =>{
        console.log('reseteando app');
        //confirmar si se desea resetear la app
        if (confirm('¿Estás seguro de que deseas continuar?')) {
            //eliminando el localstorage
            localStorage.removeItem('gastos');
            localStorage.removeItem('presupuesto');
            setPresupuesto(0);
            setIsValidPresupuesto(false);
            setGastos([]);
          } else {
            return;
          }
    }
  return (
    <>
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor:Number(porcentaje) > 70 ? '#db2777' :'#438e96',
                        trailColor:'#ddeff0',
                        textColor: '#438e96',
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
                <button 
                    className="reset-app"
                    onClick={handleResetearApp}
                    >Resetear app</button>
            </div> 

        </div>
    </>
  )
}

export default ControlPresupuesto