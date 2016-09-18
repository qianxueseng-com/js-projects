import React from 'react';
import GridView from './grid-view';
import MessageView from './message-view';

class InputView extends React.Component {
  render() {
    let { change, keyDown, click } = this.props;
    return (
      <div>
        <div className="input-n">
            <input type="text" id="n-size" value={null} placeholder="请输入n的值" onChange = {change} onKeyDown = {keyDown}/>
            <button value="submit" id="n-submit" onClick = {click} onKeyDown = {keyDown}>submit</button>
        </div>
      </div>
    );
  };
}

export default InputView;
