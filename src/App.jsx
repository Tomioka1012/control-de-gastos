import { useState, useEffect } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtro from './components/Filtro';
import { generarId } from './helpers';



function App() {
  //states del presupuesto
  const [presupuesto,setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  //states del modal
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  //states de los gastos
  const [gastos,setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  //State de un gasto unitario
  const [gastoEditar,setGastoEditar] = useState({});
  //State para el monto disponible
  const[disponible,setDisponible] = useState(0);
  //UseState para el filtrado
  const [filtro,setFiltro] = useState('todos');
  
  useEffect(()=>{

    if(Object.keys(gastoEditar).length > 0){
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 100);
    }else{
      return;
    }
    

  },[gastoEditar]);


   //useEfecct para añadir el presupuesto a local storage
   useEffect(()=>{
    localStorage.setItem('presupuesto',presupuesto ?? 0);
  },[presupuesto]);


  //useEffect para añadir los gastos al LocalStorage
  useEffect(()=>{
    localStorage.setItem('gastos',JSON.stringify(gastos) ?? []) ;

  },[gastos])

  //useEffect para mostrar el header si ya existe el presupuesto en Local Storage
  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0);
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);

    }

  },[])


  //función para mostrar el modal de nuevo gasto
  const handleNuevoGasto = () =>{
    
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 100);
  }

  //Función para guardar gastos
  const guardarGasto = gasto => {
    
    
    //verificar si un registro de nuevo gasto o edición de un gasto
    if(gasto.id){
      //actualizar gasto
      console.log('gasto a actualizar');
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto: gastoState);
      setGastos(gastosActualizados);
      setGastoEditar({});
      
    }else{
      //Nuevo gasto
      //añadir id al gasto y guardarlo en el state
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos,gasto]); 
    }

    //cerrar el modal
    setTimeout(() => {
      setModal(false);
    }, 100);
    
  }

  //Función para eliminar un gasto
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gastoStore => gastoStore.id !== id );
    setGastos(gastosActualizados);

  }

 
  

  return (
    <>
      <div className={modal ? 'fijar': ''}>
        <Header
          gastos = {gastos}
          presupuesto = {presupuesto}
          setPresupuesto = {setPresupuesto}
          isValidPresupuesto = {isValidPresupuesto}
          setIsValidPresupuesto = {setIsValidPresupuesto}
          disponible={disponible}
          setDisponible={setDisponible}
          setGastos={setGastos}
        />

        {isValidPresupuesto &&
          <>
            <main>

              <Filtro
                filtro = {filtro}
                setFiltro = {setFiltro}
               />
              <ListadoGastos
                gastos ={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro = {filtro}
              />

              

            </main>
            <div className="nuevo-gasto">
              <img 
                src={IconoNuevoGasto} 
                alt="icono-nuevo-gasto"
                onClick={handleNuevoGasto} />
            </div>
          </>
        }

        {modal &&
          <Modal
            setModal = {setModal}
            animarModal = {animarModal}
            setAnimarModal = {setAnimarModal}
            guardarGasto = {guardarGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
            disponible ={disponible}
            setDisponible = {setDisponible}

          />
        }
      </div>
      
      

      
    </>
  )
}

export default App
