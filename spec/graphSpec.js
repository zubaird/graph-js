describe("Graph", function() {
  var Graph = require('../graph.js');
  var graph;
  var data = [
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
    graph = new Graph(data);
  });

  describe("#showGraph", function(){
    it("shows data for a vertex", function() {
      var vertices = graph.showGraph();

      expect(vertices[0].edges).toEqual([1,2])
    });
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
