var Queue = require("./queue.js");

function Graph(data) {
  this.data = data
  this.vertices = {}
}

Graph.prototype.createGraph = function(){
    if (this.vertices) {
      var data = this.data;
      var vertices = {};

      for (var i = 0; i < data.length; i++) {
        // var vertex = {};
        vertices[i] = {}
        vertices[i].edges = [];
        for (var j = 0; j < data[i].length; j++) {
          vertices[i].edges.push(data[i][j]);
        }
        // vertices.push(vertex);
      }

      this.vertices = vertices
    }
  return this.vertices;
}

Graph.prototype.addVertexWithEdges = function(edges) {
  var vertices = this.vertices

  for (var vertex in vertices) {
    var newVertex = parseInt(vertex) + 1
  }

  for (var i = 0; i < edges.length; i++) {
    vertices[edges[i]].edges.push(newVertex)
  }

  vertices[newVertex] = {}
  vertices[newVertex].edges = edges

  this.vertices = vertices
  return this.vertices;
}

Graph.prototype.deleteVertex = function(vertexToDelete) {
  var vertices = this.vertices;

  delete vertices[vertexToDelete];
  for (var vertex in vertices) {
    for (var i = 0; i < vertices[vertex].edges.length; i++) {
      if (vertices[vertex].edges[i] == vertexToDelete) {
        vertices[vertex].edges.splice(i,1);
      }
    }
  }
  this.vertices = vertices
  return this.vertices;
}

Graph.prototype.initializeDistances = function(inputVertices) {
  for(var vertex in inputVertices) {
    inputVertices[vertex].distance = -1
  }
  this.vertexToDelete = inputVertices
  return this.vertexToDelete
}

Graph.prototype.getDistances = function(source) {
  var vertices = this.vertices
  this.initializeDistances(vertices);

  var queue = new Queue();
  vertices[source].distance = 0;
  vertices[source].predecessor = null;

  queue.enqueue(vertices[source])

  while (queue.length > 0) {
    var currentNode = queue.dequeue();
    var currentNodeEdges = currentNode.edges
    currentNodeEdges.forEach(function(neighbor){
      if (vertices[neighbor].distance < 0) {
        vertices[neighbor].distance = currentNode.distance + 1;
        vertices[neighbor].predecessor = currentNode;
        queue.enqueue(vertices[neighbor]);
      }
    })
  }

  return vertices
}

Graph.prototype.shortestPath = function(start,end) {
  var distance = this.getDistances(start)
  return distance[end].distance
}


module.exports = Graph
