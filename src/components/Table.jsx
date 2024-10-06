import React from 'react'
import { graph } from '../data'

const Table = () => {
  return (
    <div className='table-container'>
      <h3>Representacion de la matriz de adyacencia</h3>
      <div className="table">
        {Object.keys(graph).map((key) => (
          <div className=" bg-light table-row row" key={key}>
            <div className="col-auto border-end">
                <p className='fw-bold table-text bg-light'>{key}:</p>
            </div>
            {Object.keys(graph[key]).map((key2) => (
              <div className="col-auto" key={key2}>
                <p className='table-text bg-light'>{"[ "}{key2} : {graph[key][key2]} {" ]"	}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Table
