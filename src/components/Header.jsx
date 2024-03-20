import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"
const Header = ({presupuesto,setPresupuesto,isValidPresupuesto,setIsValidPresupuesto,gastos,disponible,setDisponible,setGastos}) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>
        {isValidPresupuesto ? (
            <ControlPresupuesto
            presupuesto = {presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
            gastos = {gastos}
            disponible ={disponible}
            setDisponible = {setDisponible}
            setGastos={setGastos}
          />
        ): (
          <NuevoPresupuesto
            presupuesto = {presupuesto}
            setPresupuesto = {setPresupuesto}
            isValidPresupuesto = {isValidPresupuesto}
            setIsValidPresupuesto = {setIsValidPresupuesto}
            
          />
        )}
        
    </header>
  )
}

export default Header