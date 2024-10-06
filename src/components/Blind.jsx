import React, { useCallback, useEffect, useState } from 'react'
import { graph } from '../data'

const Blind = ({houseList}) => {

    const [path, setPath] = useState([]);

    /**
     * Busca en profundidad desde la primera casa de la lista hasta la ultima.
     * @param {array} houseList - lista de casas
     * @returns {function} - funcion que aplica la busqueda
     */
    const BFSsearch = useCallback(() => {
        const queue = [[houseList[0], 0]];
        const visited = {};
        const parent = {};
        const tree = {0: {A: true}, 1: {}};
        let node = null;
        let profundity = 0;
        while (queue.length > 0) {
            [node, profundity] = queue.shift();
            // console.log(node, profundity);
                visited[node] = true;
                
                
                if (houseList.includes(node) && houseList.every((house) => visited[house])) {
                    const path = [];
                    while (node !== houseList[0]) {
                        path.unshift(node);
                        node = parent[node];
                    }
                    path.unshift(houseList[0]);
                    console.log(tree);
                    return path;
                }
                if(!tree[profundity + 1]){
                  console.log("empty");
                  tree[profundity + 1] = {}  
                }
                Object.keys(graph[node]).forEach((neighbor) => {
                        queue.push([neighbor, profundity + 1]);
                        parent[neighbor] = node;
                        tree[profundity + 1][neighbor] = true;
                        
                });
        }
    },[houseList ])



    useEffect(() => {
        const result = BFSsearch();
        console.log(result,"result");
        setPath(result);
    },[BFSsearch])
  return (
    <div className="blind">
        <h1>Blind Search</h1>
        <p>{path.join(" -> ")}</p>
    </div>
  )
}


export default Blind
