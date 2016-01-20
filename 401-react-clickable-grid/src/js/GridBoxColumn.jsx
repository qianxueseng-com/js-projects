/**
 * 行单元格组件
 */

import GridBoxItem from './GridBoxItem';

var GridBoxColumn = React.createClass({
    getInitialState: function () {
        return {rowNum: this.props.rowNum};
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.rowNum !== this.state.rowNum) {
            this.setState({rowNum: nextProps.rowNum});
        }
    },

    render: function () {
        var items = [];
        for (var i = 0; i < this.state.rowNum; i++) {
            items.push(
                <GridBoxItem rowNum={this.state.rowNum} key={this.props.startIndex + i + 1} content={this.props.startIndex + i + 1}/>
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
