import React from 'react';
import GridElement from './gridElement-view';

class GridView extends React.Component {
  render() {
    let n = this.props.n;
    let grids = [];

    let fontSize = Math.ceil(150 / n);

    for(let i = 0; i < n; i++) {
      grids.push(<GridElement n = {n} rowIndex = {i} key = {'Grid' + i} fontSize = {fontSize} />);
    }

    return (
      <div className="main">
          {grids}
      </div>
    );
  }
}

export default GridView;
