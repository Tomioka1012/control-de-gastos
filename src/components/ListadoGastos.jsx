import Gasto from "./Gasto"

const ListadoGastos = ({gastos,setGastoEditar,eliminarGasto,filtro}) => {
  return (
    <>
        <div className="listado-gastos contenedor">
            <h2>{gastos.length? 'Gastos':'No hay gastos aún'}</h2>
            {gastos.map(gasto => (

              filtro === 'todos' ?
              
              <Gasto 
              key={gasto.id}
              gasto ={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}/>
              
              :

              gasto.categoria === filtro &&
                <Gasto 
                key={gasto.id}
                gasto ={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}/>
   
                    
            ))}
            
        </div>
    </>
  )
}

export default ListadoGastos