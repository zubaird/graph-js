var Queue = require("./queue.js");

function Graph(data) {
  this.data = data
  this.vertices = []
}

Graph.prototype.createGraph = function(){
    if (this.vertices.length < 1) {
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

      this.vertices = vertices
    }
  return this.vertices;
}

Graph.prototype.findVertex = function(vertex) {
  var vertices = this.vertices
  for (var i = 0; i < vertices.length; i++) {
    if (vertices[i].vertex == vertex) {
      var foundVertex = vertices[i];
    }
  }
  return foundVertex;
}

Graph.prototype.addVertexWithEdges = function(edges) {
  var vertices = this.vertices
  var newVertex = {};

  newVertex.vertex = this.vertices.length;
  newVertex.edges = edges;
  vertices.push(newVertex)

  for (var i = 0; i < vertices.length; i++) {
    for (var j = 0; j < edges.length; j++) {
      if (vertices[i].vertex == edges[j]) {
        vertices[i].edges.push(newVertex.vertex);
      }
    }
  }

  this.vertices = vertices
  return this.vertices;
}

Graph.prototype.deleteVertex = function(vertexToDelete) {
  var vertices = this.vertices;

  for (var i = 0; i < vertices.length; i++) {
    if (vertices[i].vertex == vertexToDelete) {
      vertices.splice(i, 1);
    }
  }

  for (var i = 0; i < vertices.length; i++) {
    for (var j = 0; j < vertices[i].edges.length; j++) {
      if (vertices[i].edges[j] == vertexToDelete) {
        vertices[i].edges.splice(i, 1);
      }
    }
  }

  this.vertices = vertices
  return this.vertices;
}

Graph.prototype.initializeDistances = function(inputVertices) {
  inputVertices.forEach(function(vertex) {
    vertex.distance = -1;
  })
  return inputVertices
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
  var distances = this.getDistances(start)
  for (var i = 0; i < distances.length; i++) {
    if (distances[i].vertex == end) {
      return distances[i].distance;
    }
  }
}


module.exports = Graph
