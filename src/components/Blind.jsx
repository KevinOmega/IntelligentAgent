import React, { useState } from 'react'
import { graph } from '../data'

const Blind = ({results}) => {

  return (
    <div className="blind">
        <h1>Búsqueda Ciega resultados</h1>
        <div className="retults">
            <div className="tree-container">
                <h4>Arbol de expansion</h4>
                    <div className="tree">
                    {Object.keys(results.tree2).map((key) => (
                        <div className="row " key={key}>
                            <div className="col-auto">
                                <p className='fw-bold' key={key}>{ key }:</p>
                            </div>
                            <div className="tree-row col-10">
                            {
                            Object.keys(results.tree2[key]).map((key2) => (
                                <div className="col-auto" key={key2}>
                                    <div className="tree-item bg-primary text-light">
                                        <p className='fw-bold span'>{results.tree[key][key2]}: {graph[key2][results.tree[key][key2]]}</p>
                                        <p key={key2}>{key2}</p>
                                    </div>
                                </div>
                            ))
                            
                        }
                            </div>
                        </div>
                        
                    ))}
                </div>
            </div>
            <h4>Ruta</h4>
            <div className="path-container mb-3">
                <div className="row">
                    {Object.keys(results.path).map((key) => (
                        <div className="col-auto" key={key}>
                            <div className="tree-item border border-primary text-primary">
                                <p key={key}>{results.path[key]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="row">
                    <div className="col-auto">
                        <h4>Costo de busqueda : </h4>
                    </div>
                    <div className="col-auto">
                        <p>{results.searchCost}</p>
                    </div>
                
            </div>
            <div className="row">
                <div className="col-auto">
                    <h4>Costo ruta : </h4>
                    </div>

            <div className="col-auto">
                    <p >
                        {results.pathCost}
                    </p>
                </div>
            </div>
            
        </div>
    </div>
  )
}


export default Blind
