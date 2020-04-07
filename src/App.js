import React,{Component} from 'react';
import CardExampleCard from './display/ui.js';

let web3 = require('./utils/InitWeb3');
let contractInstance = require('./eth/Lottery');

class App extends Component {
  constructor() {
    super();
    this.state = {
      manager : '',
      winner : '',
      account: '',
      round : '',
      playersCount : '',
      balance : '',
      players : [],
      isPlaying: '',
    }
  }

    //内置生命周期函数,页面渲染之后自动调用
  componentDidMount() {

  }
  //内置生命周期函数，页面渲染前调用
  async componentWillMount() {
    //获取当前地址
    let accounts = await web3.eth.getAccounts();
    // console.log('accounts:',accounts);
    let manager = await contractInstance.methods.manager().call();
    let round1 = await contractInstance.methods.round().call();
    let winner = await contractInstance.methods.winner().call();
    let playersCount1 = await contractInstance.methods.getPlayersCount().call();
    //单位是wei,转换成ETH
    let balancewei = await contractInstance.methods.getBalance().call();
    let balance = web3.utils.fromWei(balancewei,'ether');
    let players = await contractInstance.methods.getPlayers().call();
    this.setState({
      account: accounts[0],
      manager: manager,
      round: round1,
      winner: winner,
      playersCount: playersCount1,
      balance : balance,
      players : players,
      isPlaying: false,
      isShowButton: accounts[0] === manager ? 'inline' : 'none',
    })
  }

  //卸载生命周期函数
  // componentWillUnmount() {
  // }

  play = async () => {
    console.log('play botton click');
    //1.调用play方法
    //2.转钱1ETH
    this.setState({isPlaying: true});
    try {
      await contractInstance.methods.play().send({
        from: this.state.account,
        value: web3.utils.toWei('1', 'ether'),
        // value: 10 ** 18,
        gas: '3000000',
      });
      alert('投注成功')
      this.setState({isPlaying: false});
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    } catch (e) {
      alert('投注失败');
      this.setState({isPlaying: false});
      console.log(e)
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }
  };

  draw = async () => {
    this.setState({isPlaying: true});
    try {
      await contractInstance.methods.draw().send({
        from: this.state.account,
        gas: '3000000',
      });
      alert('开奖成功')
      this.setState({isPlaying: false});
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    } catch (e) {
      alert('开奖失败');
      this.setState({isPlaying: false});
      console.log(e)
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }
  };

  drawback = async () => {
    this.setState({isPlaying: true});
    try {
      await contractInstance.methods.drawback().send({
        from: this.state.account,
        gas: '3000000',
      });
      alert('退奖成功')
      this.setState({isPlaying: false});
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    } catch (e) {
      alert('退奖失败');
      this.setState({isPlaying: false});
      console.log(e)
      //强制界面刷新
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }
  };

  render(){
    console.log('web3 version:',web3.version);
    console.log('web3 version:',window.web3.version);
    return (
        <div>
          <CardExampleCard
              account={this.state.account}
              manager={this.state.manager}
              winner={this.state.winner}
              round={this.state.round}
              players={this.state.players}
              playersCount={this.state.playersCount}
              balance={this.state.balance}
              play={this.play}
              draw={this.draw}
              drawback={this.drawback}
              isPlaying={this.state.isPlaying}
              isShowButton={this.state.isShowButton}
          />
        </div>
    );
  }
}

export default App;
