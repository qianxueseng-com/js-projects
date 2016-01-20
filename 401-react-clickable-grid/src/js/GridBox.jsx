/**
 * n × n 单元格组件
 */

import GridBoxColumn from './GridBoxColumn';

var GridBox = React.createClass({
    getInitialState: function () {
        return {rowNum: this.props.rowNum};
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.rowNum !== this.state.rowNum) {
            this.setState({rowNum: nextProps.rowNum});
        }
    },

    render: function () {
        var rowNum   = this.state.rowNum;
        var fontSize = rowNum < 32 ? (300 / rowNum) + 'px' : '1px';
        var columns  = [];

        for (var i = 0; i < rowNum; i++) {
            columns.push(<GridBoxColumn key={i} rowNum={rowNum} startIndex={i}/>);
        }

        return (
            <div id="box" style={{fontSize:fontSize}}>
                {columns}
            </div>
        );
    }
});

export default GridBox;
