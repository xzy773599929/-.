pragma solidity >=0.4.22 <0.7.0;

contract Lottery {
    //1.管理员，负责开奖和退钱
    address public manager;
    //2.彩民池，address[] player
    address[] public players;
    //3.当前期数：每期结束后加一
    uint256 public round;
    //4.赢家
    address public winner;
    //构造函数，合约部署人为管理员
    constructor() public {
        manager = msg.sender;
    }
    //修饰函数，仅有管理员可操作
    modifier onlyOwner() {
        require(msg.sender == manager);
        _;
    }
    //每个人可以投多次，但每次只能投1ETH
    function play() payable public {
        require(msg.value == 1 ether);
        //把参与者加入彩民池中
        players.push(msg.sender);
    }
    //开奖函数
    function draw() public onlyOwner {
        //没有玩家不能开奖
        require(players.length != 0);
        //产生随机数，利用区块时间，区块难度，玩家数量产生随机哈希值
        bytes memory v1 = abi.encodePacked(block.timestamp,block.difficulty,players.length);
        bytes32 v2 = keccak256(v1);
        uint256 v3 = uint256(v2);
        //随机数对玩家数取余，产生最后赢家
        uint256 index = v3 % players.length;
        winner = players[index];
        //计算奖金和手续费
        uint256 money1 = address(this).balance * 90 / 100;
        uint256 money2 = address(this).balance - money1;
        //转账
        winner.transfer(money1);
        manager.transfer(money2);
        //轮数加一，玩家池清空
        round++;
        delete players;
    }
    //退钱函数
    function drawback() public onlyOwner {
        require(players.length != 0);
        for(uint256 i = 0; i < players.length; i++){
            players[i].transfer(1 ether);
        }
        //轮数加一，玩家池清空
        round++;
        delete players;
    }
    //辅助函数，获取参与人数
    function getPlayersCount() public view returns(uint256) {
        return players.length;
    }
    //辅助函数，获取彩民池
    function getPlayers() public view returns(address[] memory){
        return players;
    }
    //辅助函数，获取奖金池金额
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
}
