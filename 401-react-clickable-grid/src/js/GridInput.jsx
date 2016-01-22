/**
 * 单元格行数输入组件
 */

var GridInput = React.createClass({
    render: function () {
        return (
            <div id="selnum">
                <label htmlFor="row-num">请输入方块行数</label>
                <input type="number" id="row-num" min="1" max="50" autoFocus value={this.props.value} ref="rowNumInput" onChange={this.props.handleInputChange}/>
            </div>
        );
    }
});

export default GridInput;
