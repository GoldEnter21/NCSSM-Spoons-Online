class graph {
        
    constructor(noOfVertices){
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    // add vertex to the graph
    addVertex(v){
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);
    }
    
    // add edge to the graph
    addEdge(v, w, direction)
    {
        if (direction == "vToW") {
            this.AdjList.get(v).push(w);
        } else if (direction == "wToV") {
            this.AdjList.get(w).push(v);
        } else if (direction == "undirected") {
            this.AdjList.get(v).push(w);
            this.AdjList.get(w).push(v);
        }
    }
    
    removeVertex(v){
        this.AdjList.delete(key, v)
        for (let adjacencies of this.AdjList.values()) {
            const index = adjacencies.indexOf(v);
            if (index > -1) { // only splice array when item is found
              adjacencies.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    }
}