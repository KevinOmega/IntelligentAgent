import React, { useCallback, useEffect, useState } from 'react'
import { graph } from '../data'
import { BFSsearch } from '../searches'

const Blind = ({results}) => {

    const [path, setPath] = useState([]);

    /**
     * Busca en profundidad desde la primera casa de la lista hasta la ultima.
     * @param {array} houseList - lista de casas
     * @returns {function} - funcion que aplica la busqueda
     */
    



  return (
    <div className="blind">
        <h1>Búsqueda Ciega resultados</h1>
        <div className="retults">
            <div className="tree-container">
                <h4>Arbol de expansion</h4>
                    <div className="tree">
                    {Object.keys(results.tree2).map((key) => (
                        <div className="row" key={key}>
                            <div className="col-auto">
                                <p className='fw-bold' key={key}>{ key }:</p>

                            </div>
                            {
                            Object.keys(results.tree2[key]).map((key2) => (
                                <div className="col-auto" key={key2}>
                                    <p key={key2}>{key2}</p>
                                </div>
                            ))
                        }
                        </div>
                        
                    ))}
                </div>
            </div>
            <h4>Ruta</h4>
            <div className="path-container">
                <div className="row">
                    {Object.keys(results.path).map((key) => (
                        <div className="col-auto" key={key}>
                            <p key={key}>{results.path[key]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}


export default Blind
