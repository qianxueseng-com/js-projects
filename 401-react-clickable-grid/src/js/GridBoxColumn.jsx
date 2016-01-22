/**
 * 行单元格组件
 */

import GridBoxItem from './GridBoxItem';

var GridBoxColumn = React.createClass({
    render: function () {
        var items = [];
        for (var i = 0; i < this.props.rowNum; i++) {
            items.push(
                <GridBoxItem rowNum={this.props.rowNum} key={this.props.startIndex + i + 1} content={this.props.startIndex + i + 1}/>
            );
        }

        return (
            <div className="column">
                {items}
            </div>
        );
    }
});

export default GridBoxColumn;
