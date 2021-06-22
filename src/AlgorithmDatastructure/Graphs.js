class Graph {
    constructor() {
        this.adjacencyList = {};        // Danh sach ke ~~ giong hashmap
    }

    addVertex(vertex) {         // Dinh
        if (!this.adjacencyList[vertex])
            this.adjacencyList[vertex] = new Array();
    }

    addEdge(v1, v2) {
        if (!this.adjacencyList[v1]) throw new Error(`please add vertex ${v1} first`);
        if (!this.adjacencyList[v2]) throw new Error(`please add vertex ${v2} first`);
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }

    removeEdge(v1, v2) {
        this.adjacencyList[v1] = this.adjacencyList[v1].filter((vertex) => {
            return vertex !== v2;
        });

        this.adjacencyList[v2] = this.adjacencyList[v2].filter((vertex) => {
            return vertex !== v1;
        });
    }

    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const otherVertex = this.adjacencyList[vertex][0];
            this.removeEdge(vertex, otherVertex);
        }

        delete this.adjacencyList[vertex]; // delete object completely
    }

    recursiveDFS(startVertex) {
        let visited = {};
        let result = [];
        let adjacencyList = this.adjacencyList;

        function dfs(vertex) {
            visited[vertex] = true;
            result.push(vertex);
            for (let neighbor of adjacencyList[vertex]) {
                if (!visited[neighbor]) dfs(neighbor);
            }
        }

        dfs(startVertex);
        console.log(result);
    }
}

let mgraph = new Graph();
mgraph.addVertex("A");
mgraph.addVertex("B");
mgraph.addVertex("C");
mgraph.addVertex("D");
mgraph.addVertex("E");
mgraph.addVertex("F");

mgraph.addEdge("A", "B");
mgraph.addEdge("A", "C");
mgraph.addEdge("C", "E");
mgraph.addEdge("B", "D");
mgraph.addEdge("D", "E");
mgraph.addEdge("D", "F");
mgraph.addEdge("E", "F");

// console.log(mgraph.adjacencyList);

mgraph.recursiveDFS("A");

/*
        A
    /       \
    B       C
    |       |
    D ----- E
    \      /
       F
*/

