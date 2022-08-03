import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';

import './PathfindingVisualizer.css';
//To keep track of our grid and our state as initialised at the very beginning 
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
//constants for the row and cols of start & finish node

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    //setstate to update the response to event handlers, server responses, or prop changes 
    //prop would be basically an arguement passed into react components
    //basically pass data from parent to child component in react
    this.setState({grid});
  }

  //creating walls
  //functions to handle the mouse events
  handleMouseDown(row, col) {
    //calling the function written below
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //when the mouse is down, the mouse pressed should be turned true
    this.setState({grid: newGrid, mouseIsPressed: true});
  }
//is we are dragging the mouse taht identifies the walls
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    //once the mouse is released the walls aren't there anymore so 'false'
    this.setState({mouseIsPressed: false});
  }
  //through async/set timeout in js we can change the state every 0.5 seconds on each node to animate them  
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    //goes through all the nodes that we visited in order 
    //and every node we basically create a new node of that node
    //and we mark it as isVisited and we update our state/grid with that new node 
    //we do a copy/slicing of teh state of the grid 
    //
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      //if we are doen with all the other set timeouts
      // i = end of teh visited nodes in order tehn animate the shortest path this time
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          //another animation
          //every 10ms animate the node
          //we are not using react for this as it will update the state nad then all the components 
          //slowing down the performance and giving errors, as we will have to re-render the entire grid 
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
          //node-shortestpath will be in yellow to track teh shortest path
          //50ms as the dots rate to appears
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    //passing the start and finish node from the grid
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    //call the function to get the visited nodes in the order of dijkstra
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    //call another node to get the nodes in the shortest path order 
    //starting at the finish node and makign our way back
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <button id="buttton" onClick={() => this.visualizeDijkstra()}>
            Click here to Visualize Dijkstra's Algorithm! :)
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

//hard coding the number of rows and columns 
//then creating nodes out of all of them
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

//the distance property below can be used in the dijkstra's algorithm
//nodes are structured => distance, row, col, isVisited, pointer to the prev node
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
//node at the given row and col keeps toggling between a wall and not a wall
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};














//older version of the code



//// import React, {Component} from 'react';
// import Node from './Node/Node';

// import './PathfindingVisualizer.css';
// export default class PathfindingVisualizer extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             nodes: [],
//         };
//     }

//     componentDidMount() {
//         const nodes =[];
//         for(let row = 0; row < 15; row++) {
//             //15 nodes and 50 cols each 
//             //iterate through every col and create a node
//             const currentRow = [];
//             for(let col=0; col<50;col++) {
//                 const currentNode = {
//                     //object for every node which affirms isStart is only true if row is 10 and col 5
//                     // isfinish is the same but 45th col
//                     col,
//                     row, 
//                     isStart: row === 10 && col === 5,
//                     isFinish: row === 10 && col === 45,
//                 };
//                 currentRow.push({currentNode});
//             }
//             nodes.push(currentRow);
//         }
//         this.setState({nodes});
//     }
//     render() {
//         const {nodes} = this.state;
//         console.log(nodes);
//         return (
//             <div class = "grid">
//             {nodes.map((row, rowIdx) => {
//                 return (
//                 <div key ={rowIdx}>
//                 {row.map((node, nodeIdx) => {
//                 const {isStart, isFinish} = node;
//                            return (<Node 
//                            key = {nodeIdx} 
//                            isStart={isStart} 
//                            isFinish = {isFinish} 
//                            test={'foo'} 
//                            test={'kappa'}>
//                            </Node>
//                            );
//                            //2 nodes one is start and one is finish
//                         })}
//                     </div>
//                 );
//             })}
//             </div>
//         );
//     }
// }

// //dijkstra's algo is a weighted algo which literally translates to if you have a weighted node/points in between start and finish nodes
// //it can still pass through those but it will be a little tougher to find the way around it
