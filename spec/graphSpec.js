describe("Graph", function() {
  var Graph = require('../graph.js');
  var graph;
  var graphData = [
    [1,2],
    [0,2],
    [0,1,3,6,7],
    [2,5],
    [5,8],
    [3,4],
    [2],
    [2,8],
    [4,7]
  ]

  beforeEach(function() {
    graph = new Graph(graphData);
    graph.createGraph()
    
  });

  describe("#createGraph", function(){
    it("sets graph.vertices to an array", function(){
      var isAnArray = Array.isArray(graph.vertices);

      expect(isAnArray).toEqual(true)
    })
    it("can show the first vertex", function() {
      var firstVertex = graph.vertices[0];

      expect(firstVertex).toEqual({ vertex: 0, edges: [ 1, 2 ] })
    });
    it("can show the last vertex", function() {
      var lastVertex = graph.vertices[graph.vertices.length -1];

      expect(lastVertex).toEqual({ vertex: 8, edges: [ 4, 7 ] })
    });
  })

  describe("#findVertex",function(){
    it("finds a vertex by number if it exists", function(){
      var vertexThree = graph.findVertex(3);

      expect(vertexThree).toEqual({ vertex: 3, edges: [ 2, 5 ] })
    })
  })

  describe("#addVertexWithEdges", function(){

    describe("when adding a vertex with one edge", function() {
      it("adds a new vertex with the edge", function(){
        var newSet = graph.addVertexWithEdges([1]);
        var lastAddedVertex = newSet.length -1

        expect(newSet[lastAddedVertex].edges).toEqual([1])
      })
      it("adds the new vertex as an edge to existing vertices it may be connected to", function(){
        var newSet = graph.addVertexWithEdges([1]);

        expect(newSet[1].edges).toEqual([0,2,9])
      })
    })

    describe("when adding a vertex with more than one edge", function(){
      it("adds a new vertex with the edges", function(){
        var newSet = graph.addVertexWithEdges([1,2,3]);
        var lastAddedVertex = newSet.length -1

        expect(newSet[lastAddedVertex].edges).toEqual([1,2,3])
      })
      it("adds the new vertex as an edge to existing vertices it may be connected to", function(){
        var newSet = graph.addVertexWithEdges([1,2,3]);

        expect(newSet[1].edges).toEqual([0,2,9])
        expect(newSet[2].edges).toEqual([0,1,3,6,7,9])
        expect(newSet[3].edges).toEqual([2,5,9])
      })
    })
  })

  describe("#deleteVertex",function(){
    it("should remove that vertex from vertices",function(){
      var originalLength = graph.vertices.length
      graph.deleteVertex(2);

      expect(graph.vertices.length).toEqual(originalLength - 1)
    })
    it("should remove that vertex from all the edges",function(){
      graph.deleteVertex(1);

      expect(graph.vertices[0].edges).toEqual([2])
      expect(graph.vertices[1].edges).toEqual([0,3,6,7])
    })
  })

  describe("Measuring distances", function() {

    describe("#initializeDistances", function() {
        it("adds a distance property to each vertex and makes it equal to '-1'", function(){
          var firstVertex = graph.initializeDistances(graph.vertices)[0];

          expect(firstVertex.distance).toEqual(-1)
        })
    })

    describe("#distances",function(){
      it("shows distances from nodes", function(){
        for (var i = 0; i < graph.getDistances(0).length; i++) {
          if (graph.getDistances(0)[i].vertex == 3) {
            var thirdVertex = graph.getDistances(0)[i]
          }
        }
        expect(thirdVertex.distance).toEqual(2)
      })
    })

  })

  describe("#shortestPath",function(){
    it("finds the shortest path between 0 to 4",function(){
      expect(graph.shortestPath(0,4)).toEqual(4)
    })
    it("finds the shortest path between 0 to 1", function(){
      expect(graph.shortestPath(0,1)).toEqual(1)
    })
    it("finds the shortest path between 1 to 4",function(){
      expect(graph.shortestPath(1,4)).toEqual(4)
    })
    it("finds the shortest path between 5 to 4",function(){
      expect(graph.shortestPath(5,4)).toEqual(1)
    })
    it("finds the shortest path between 3 to 5",function(){
      expect(graph.shortestPath(3,5)).toEqual(1)
    })
    it("finds the shortest path between 3 to 4",function(){
      expect(graph.shortestPath(3,4)).toEqual(2)
    })
  })

});
