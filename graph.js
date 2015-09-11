var Queue = require("./queue.js");

function Graph(data) {
  this.data = data
  this.vertices = {}
}

Graph.prototype.createGraph = function(){

  // format this.data to look like the expected result

  return this.vertices;
}

Graph.prototype.addVertexWithEdges = function(edges) {
  var vertices = this.vertices

  // add a new vertex with the passed in array as its edges

  this.vertices = vertices
  return this.vertices;
}

Graph.prototype.deleteVertex = function(vertexToDelete) {
  var vertices = this.vertices;

  // delete vertexToDelete

  this.vertices = vertices
  return this.vertices;
}

Graph.prototype.initializeDistances = function(inputVertices) {
  // add a distance property to each vertex and set it to -1
  // we'll do this so that we can keep track of
  // visited vertexes in our BFS
}

Graph.prototype.getDistances = function(source) {
  var vertices = this.vertices
  this.initializeDistances(vertices);

  //implement BFS

  return vertices
}

Graph.prototype.shortestPath = function(start,end) {
  var distance = this.getDistances(start)

  // return the distance of the end vertex
}


module.exports = Graph
