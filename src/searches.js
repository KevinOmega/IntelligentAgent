import { graph } from "./data";

const BFSsearch = (houseList) =>  {
    const queue = [[houseList[0], 0]];
    const visited = {};
    const tree = {0: {A: null}, 1: {}};
    const tree2 = {0: {A: null}, 1: {}};
    let node = null;
    let profundity = 0;
    while (queue.length > 0) {
        [node, profundity] = queue.shift();
        if(!tree2[profundity]){
            tree2[profundity] = {}
        }
        tree2[profundity][node] = true;
            visited[node] = true;
            
            if (houseList.includes(node) && houseList.every((house) => visited[house])) {
                const path = [];
                let tempNode = node;
                while (tempNode !== houseList[0]) {
                    path.unshift(tempNode);
                    tempNode = tree[profundity][tempNode];
                    profundity--;
                }
                path.unshift(houseList[0]);
                const searchCost =  Object.keys(tree2).reduce((total, key) => {
                    return Number(total) + Object.keys(tree2[key]).length
                } 
                
                );
            
                let pathCost = 0;
                for (let i = 0; i < path.length - 2; i++) {
                    pathCost += graph[path[i]][path[i + 1]];
                }

                return {path, tree2,tree, searchCost, pathCost};
            }
            if(!tree[profundity + 1]){
              tree[profundity + 1] = {}  
            }
            // eslint-disable-next-line no-loop-func
            Object.keys(graph[node]).forEach((neighbor) => {
                    queue.push([neighbor, profundity + 1]);
                    tree[profundity + 1][neighbor] = node;
                    
            });
    }
}

const dijkstasAlgorithm = (nodeA, nodeB ) => {
    const distances = { [nodeA]: 0 };
    const queue = [[nodeA, 0]];
    let currentNode, currentDistance, nextNode;

    while (queue.length) {
        [currentNode, currentDistance] = queue.shift();

        if (currentNode === nodeB) {
            nextNode = currentNode;
            break;
        }

        // eslint-disable-next-line no-loop-func
        Object.keys(graph[currentNode]).forEach((neighbor) => {
            const distance = currentDistance + graph[currentNode][neighbor];
            if (!distances[neighbor] || distances[neighbor] > distance) {
                distances[neighbor] = distance;
                queue.push([neighbor, distance]);
            }
        });
    }
    return { distance: distances[nodeB] };
}

const heuristicSearch_A = (houseList) => {
    
    let currentNode = houseList[0];
    let tree = {0: {A : null},1 : {}};
    
    let p = 0;

    while(true){
        
        //Verificar que no se haya visitado cada casa
        console.log("node",currentNode);
        const reconstructedPath = reconstructPath(tree, houseList[0], currentNode, p);
        console.log(reconstructedPath,"path");
        if(everyHouseIsReached(reconstructedPath, houseList)){
            console.log("results", reconstructedPath,tree);
            const pathCost = getPathCost(reconstructedPath);
            const searchCost =  Object.keys(tree).reduce((total, key) => {
                return Number(total) + Object.keys(tree[key]).length
            } 
            );
            return {path : reconstructedPath, tree,pathCost,searchCost};
        }

        p++;
        
        if(!tree[p]){
            tree[p] = {}
        }
        let neighbors = [];

        //buscar vecinos de currentNode
        // eslint-disable-next-line no-loop-func
        Object.keys(graph[currentNode]).forEach((neighbor) => {
            tree[p][neighbor] = currentNode;
            neighbors.push(neighbor);
        });

        let minHeuristic = Infinity;
        //buscar funcion heuristica minima
        // eslint-disable-next-line no-loop-func
        neighbors.forEach((neighbor) => {
            for(let i = 0; i < houseList.length; i++){
                if(!reconstructedPath.includes(houseList[i])){
                    let heuristic = dijkstasAlgorithm(neighbor, houseList[i]);
                    if(heuristic.distance < minHeuristic){
                        minHeuristic = heuristic.distance;
                        currentNode = neighbor;
                    }
                }
            }
            
        });
    }
}

const everyHouseIsReached = (reconstructPath, houseList) => {
    return houseList.every((house) => reconstructPath.includes(house));
}

const reconstructPath = (tree,startNode,currentNode,profundity) => {
    const reconstructPath = [];
    if(!profundity){
        return [startNode];
    }
console.log("---------------------")
    while(profundity > 0){
        console.log(currentNode,"currentNode")
        reconstructPath.push(currentNode);
        console.log(tree[profundity], profundity)
        currentNode = tree[profundity][currentNode];
        if(currentNode === startNode){
            reconstructPath.push(startNode);
            break;
        }
        profundity--;
    }
    return reconstructPath.reverse();
}

const getPathCost = (path) => {
    let pathCost = 0;
    for (let i = 0; i < path.length - 2; i++) {
        pathCost += graph[path[i]][path[i + 1]];
    }
    return pathCost;
}

export {BFSsearch,heuristicSearch_A}