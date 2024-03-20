import { useState, useEffect } from 'react'
import React from 'react'

const Filtro = ({filtro,setFiltro}) => {
    
  
    
  return (
    <>
        
            <div className=" contenedor">
                <div className='filtros sombra campo'>
                    <label htmlFor="" className=''>Categoría</label>
                        <select 
                            name="" 
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        >
                            <option value="todos" className='campo' >Todos los gastos</option>
                            <option value="ahorro" className='campo'>Ahorro</option>
                            <option value="comida" className='campo'>Comida</option>
                            <option value="casa" className='campo'>Casa</option>
                            <option value="gastos" className='campo'>Gastos varios</option>
                            <option value="ocio" className='campo'>Ocio</option>
                            <option value="salud" className='campo'>Salud</option>
                            <option value="suscripciones" className='campo'>Suscripciones</option>

                        </select>

                </div>
                
            </div>
    
    </>
  )
}

export default Filtro