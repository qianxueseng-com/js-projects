import React from 'react';

class GridElement extends React.Component {
  render() {
    let {rowIndex, fontSize, n} = this.props;
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

export default GridElement;
