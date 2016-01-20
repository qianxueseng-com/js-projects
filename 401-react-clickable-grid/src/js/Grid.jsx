import GridInput from './GridInput';
import GridBox from './GridBox';

var Grid = React.createClass({
    getInitialState: function () {
        var defaultRowNum = 5;
        return {rowNum: defaultRowNum};
    },

    handleInputChange: function () {
        this.setState({rowNum: this.refs.rowNum.refs.rowNumInput.value});
    },

    render: function () {
        return (
            <div>
                <GridInput ref="rowNum" value={this.state.rowNum} handleInputChange={this.handleInputChange}/>
                <GridBox rowNum={this.state.rowNum}/>
            </div>
        );
    }
});

export default Grid;
