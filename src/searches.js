import { graph } from "./data";

const BFSsearch = (houseList) =>  {
    const queue = [[houseList[0], 0]];
    const visited = {};
    const tree = {0: {A: true}, 1: {}};
    const tree2 = {0: {A: true}, 1: {}};
    let node = null;
    let profundity = 0;
    while (queue.length > 0) {
        [node, profundity] = queue.shift();
        console.log(node, profundity);
        if(!tree2[profundity]){
            tree2[profundity] = {}
        }
        tree2[profundity][node] = true;
            visited[node] = true;
            
            if (houseList.includes(node) && houseList.every((house) => visited[house])) {
                console.log("encontrado");
                const path = [];
                let tempNode = node;
                while (tempNode !== houseList[0]) {
                    console.log(tempNode,"finding path");
                    path.unshift(tempNode);
                    tempNode = tree[profundity][tempNode];
                    profundity--;
                }
                path.unshift(houseList[0]);
                console.log(tree);
                return {path, tree2};
            }
            if(!tree[profundity + 1]){
              console.log("empty");
              tree[profundity + 1] = {}  
            }
            // eslint-disable-next-line no-loop-func
            Object.keys(graph[node]).forEach((neighbor) => {
                    queue.push([neighbor, profundity + 1]);
                    tree[profundity + 1][neighbor] = node;
                    
            });
    }
}

export {BFSsearch}