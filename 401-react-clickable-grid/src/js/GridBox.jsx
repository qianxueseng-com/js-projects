/**
 * n × n 单元格组件
 */

import GridBoxColumn from './GridBoxColumn';

var GridBox = React.createClass({
    render: function () {
        var threshold = 32;
        var maxSize   = 300;
        var rowNum    = this.props.rowNum;
        var fontSize  = rowNum < threshold ? (maxSize / rowNum) + 'px' : '1px';
        var columns   = [];

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
