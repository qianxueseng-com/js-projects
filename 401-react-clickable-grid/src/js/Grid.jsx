import GridInput from './GridInput';
import GridBox from './GridBox';

var Grid = React.createClass({
    getInitialState: function () {
        var defaultRowNum = 5;
        return {rowNum: defaultRowNum};
    },

    handleChildChange: function (value) {
        this.setState({rowNum: value});
      },

    render: function () {
        return (
            <div>
                <GridInput value={this.state.rowNum} handleInputChange={this.handleChildChange}/>
                <GridBox rowNum={this.state.rowNum}/>
            </div>
        );
    }
});

export default Grid;
