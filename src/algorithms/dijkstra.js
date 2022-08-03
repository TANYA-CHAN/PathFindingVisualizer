//assigning a distance to all the nodes in a great
//distance to start at infinity except for the strat node at 0
//finding the closest node at any point of time 
//done with an array of unvisited nodes that we keep sorting everytime
//whenever we visit a new node we mark it as visited
//update all the neighbors to see which one is the closest at any point of time
//keeping tracking of the previous node which we traversed
//backtracks from teh finish to the starting node to find the shortest path 
//----------------------------------------
// Basically Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    //start node has a distance of 0 all the others haev a distance of infinity
    //This method returns an array of visited nodes in the order we visited them
    //after every closest node we just append the closest node to the array of visited nodes in order
    //when we reach the finish node we return that array.
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      //unshit adds a value to the array so we need to shift so as to pop the value from the array 
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop, and return the visited nodes in order
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  //sorting the unvisited nodes by the distance and the closest node is the one which is 'closestNode'
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  //to only get the unvisited neighbors 
  //when we are updating the neighbors with new distance we mark them with
  //the previous node ie the current node that we're at to give shortest path 
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  //filters all the neighbors to the ones that are only unvisited 
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    //here
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      //traversing backwards with previousNodes
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }


  //every other node on the graph/grid is gonan have a distance/score of infinity to the starting node
  //directions: up, right, left, down
  //grab all the neighbors of the starting node and update their distances
  //pick the closest of the neighbors



