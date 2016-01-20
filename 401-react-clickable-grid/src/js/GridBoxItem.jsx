/**
 * 单个单元格组件
 */

var GridBoxItem = React.createClass({
    getInitialState: function () {
        return {rowNum: this.props.rowNum};
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.rowNum !== this.state.rowNum) {
            this.setState({rowNum: nextProps.rowNum});
        }
    },

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
