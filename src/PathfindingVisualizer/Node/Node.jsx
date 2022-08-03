import React, {Component} from 'react';

import './Node.css';


//Function to create walls on the grid so if you click on a node/box 
//that node hsould become a wall or turn back into a normal node/box if it was alreayd a wall
//If you click and drag walls should be formed at thsoe boxes 
//so for all these movements there are 3 onclick listeners
//Up, Down and Enter
//onMouseDown = press down the mouse button (which ia how the wall will be created)
//onMouseEnter = hovering above an element, when the mouse enters the elements area this onClick event listener gets triggered/called
//onMouseUp = release the wall
//onClick is when we press and release the mouse button
export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
    //which class to put the traversed node in
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
      //id to access the element
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        //all these onclick events are defined in the pathvisualizer file
        //onclick events are just for walls
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}