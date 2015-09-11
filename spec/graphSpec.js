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
    it("sets graph.vertices to an object", function(){
      var isAnObject = graph.vertices.hasOwnProperty(0);

      expect(isAnObject).toEqual(true)
    })
    it("can show the first vertex", function() {
      var firstVertex = graph.vertices[0];

      expect(firstVertex).toEqual({ edges: [ 1, 2 ] })
    });
    it("can show the last vertex", function() {
      var lastVertex = graph.vertices[8];

      expect(lastVertex).toEqual({ edges: [ 4, 7 ] })
    });
  })

  describe("#addVertexWithEdges", function(){

    describe("when adding a vertex with one edge", function() {
      it("adds a new vertex with the edge", function(){
        graph.addVertexWithEdges([1]);

        expect(graph.vertices[9].edges).toEqual([1])
      })
      it("adds the new vertex as an edge to existing vertices it may be connected to", function(){
        graph.addVertexWithEdges([1]);
        expect(graph.vertices[1].edges).toEqual([0,2,9])
      })
    })

    describe("when adding a vertex with more than one edge", function(){
      it("adds a new vertex with the edges", function(){
        graph.addVertexWithEdges([1,2,3]);

        expect(graph.vertices[9].edges).toEqual([1,2,3])
      })
      it("adds the new vertex as an edge to existing vertices it may be connected to", function(){
        graph.addVertexWithEdges([1,2,3]);

        expect(graph.vertices[1].edges).toEqual([0,2,9])
        expect(graph.vertices[2].edges).toEqual([0,1,3,6,7,9])
        expect(graph.vertices[3].edges).toEqual([2,5,9])
      })
    })
  })

  describe("#deleteVertex",function(){
    it("should remove that vertex from vertices",function(){
      graph.deleteVertex(2);

      expect(graph.vertices[2]).toEqual(undefined)
    })
    it("should remove that vertex from all the edges",function(){
      graph.deleteVertex(1);

      expect(graph.vertices[0].edges).toEqual([2])
      expect(graph.vertices[2].edges).toEqual([0,3,6,7])
    })
  })

  describe("Measuring distances", function() {

    describe("#initializeDistances", function() {
        it("adds a distance property to each vertex and makes it equal to '-1'", function(){
          var firstVertex = graph.initializeDistances(graph.vertices)[0];

          expect(firstVertex.distance).toEqual(-1)
        })
    })

    describe("#getDistances",function(){
      it("shows distances from vertex 0", function(){
        var thirdVertex = graph.getDistances(0)[3]

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
