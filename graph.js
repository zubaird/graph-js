function Graph(data) {
  this.data = data
}

Graph.prototype.showGraph = function(){
  var data = this.data;
  var vertices = [];
  for (var i = 0; i < data.length; i++) {
    var vertex = {};
    vertex.vertex = i
    vertex.edges = [];
    for (var j = 0; j < data[i].length; j++) {
      vertex.edges.push(data[i][j]);
    }
    vertices.push(vertex);
  }
  return vertices;
}

Graph.prototype.findVertex = function(vertex) {
  var vertices = this.showGraph();
  for (var i = 0; i < vertices.length; i++) {
    if (vertex == vertices[i].root) {
      return vertices[i];
    }
  }
}

Graph.prototype.getDistances = function(source) {
  var vertices = this.showGraph();
  var queue = [];
  var startingEdges =  vertices[source].edges;
  var visited = {};
  //visited[source] = 1;//vertices[source]};

  vertices.forEach(function(vertex) {
    vertex.distance = -1;
  })

  vertices[source].distance = 0;
  vertices[source].predecessor = null;
  queue.unshift(vertices[source])

  while (queue.length > 0) {
    var currentNode = queue.pop();
    var currentNodeEdges = currentNode.edges
    currentNodeEdges.forEach(function(neighbor){
      if (vertices[neighbor].distance < 0) {
        vertices[neighbor].distance = currentNode.distance + 1;
        vertices[neighbor].predecessor = currentNode;
        queue.unshift(vertices[neighbor]);
      }
    })
  }
  return vertices
}

Graph.prototype.shortestPath = function(start,end) {
  
}

module.exports = Graph
