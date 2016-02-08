import React from 'react';

class GridElement extends React.Component {
  render() {
    let rowIndex = this.props.rowIndex;
    let fontSize = this.props.fontSize;
    let n = this.props.n;
    let gridRow = [];

    let style = {
      fontStyle: {
        fontSize: fontSize
      }
    }

    for(let i = 0; i < n; i++) {
      let number = rowIndex * n + i + 1;
      gridRow.push(<li id = {number} key = {'li' + number} style = {style.fontStyle} >{number}</li>);
    }

    return (
      <ul key = {'ul' + rowIndex} >
        {gridRow}
      </ul>
    );
  }
}

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
