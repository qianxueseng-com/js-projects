/**
 * 单个单元格组件
 */

var GridBoxItem = React.createClass({
    handleClick: function () {
        console.log(this.props.content);
    },

    render: function () {
        return (
            <div className="item" onClick={this.handleClick}>{this.props.content}</div>
        );
    }
});

export default GridBoxItem;
