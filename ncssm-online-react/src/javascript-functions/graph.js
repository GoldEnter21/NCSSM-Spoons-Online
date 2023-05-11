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
        for (let [key, value] of this.AdjList) {
            console.log("bru22" + key.firstName + " = " + value[0]);
        }
        if (direction === "vToW") {
            var currList = this.AdjList.get(v);
            currList.push(w);
            this.AdjList.set(v, currList);
            // console.log("sus");
        } else if (direction === "wToV") {
            var currList = this.AdjList.get(w);
            currList.push(v);
            this.AdjList.set(w, currList);
        } else if (direction === "undirected") {
            var currList = this.AdjList.get(v);
            currList.push(w);
            this.AdjList.set(v, currList);
            currList = this.AdjList.get(w);
            currList.push(v);
            this.AdjList.set(w, currList);
        } else {
            console.log("complete fail");
        }
    }
    
    removeVertex(key, v){
        this.AdjList.delete(key, v)
        for (let adjacencies of this.AdjList.values()) {
            const index = adjacencies.indexOf(v);
            if (index > -1) { // only splice array when item is found
              adjacencies.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    }
}

export default graph 