import React from 'react';
import GridView from './grid-view';
import MessageView from './message-view';
import InputView from './input-view';

class AppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: null,
      message: null
    };
    this.inputN = 0;
    this.judgeMessage = null;
  };
  handleChange = (event) => {
    let inputN = event.target.value;
    let judgeMessage = null;
    if(parseInt(inputN) != inputN){
      judgeMessage = '请输入0~20的正整数';
      inputN = null;
    } else {
      if(inputN < 0) {
        judgeMessage = '请输入一个大于等于0的整数';
        inputN = null;
      }
      if(inputN > 20) {
        judgeMessage = '请输入小于20的正整数';
        inputN = null;
      }
    }
    this.inputN = inputN;
    this.judgeMessage = judgeMessage;
  };
  handleClick = () => {
    this.setState({
      n: this.inputN,
      message: this.judgeMessage
    });
  };
  handleKeyDown = (event) => {
    if(event.keyCode === 13){
      this.handleClick();
    }
  };
  render() {
    return (
      <div>
        <InputView change = {this.handleChange} keyDown = {this.handleKeyDown} click = {this.handleClick} />
        <MessageView message = {this.state.message} />
        <GridView n = {this.state.n} />
      </div>
    );
  };
}

export default AppView;
