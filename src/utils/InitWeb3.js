//引入web3
// const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
// const mnemonic = "across true quiz enhance define glare company evidence budget short boost mother"; // 12 word mnemonic
// let provider = new HDWalletProvider(mnemonic, "http://127.0.0.1:8545");
// // HDWalletProvider is compatible with Web3. Use it at Web3 constructor, just like any other Web3 Provider
const web3 = new Web3();


//设置用户自己的provide来填充web3
if(typeof window.web3 !== 'undefined'){
    web3.setProvider(window.web3.currentProvider);
    async function getAccount() {
        // eslint-disable-next-line no-undef
        const accountss = await ethereum.enable();
        const accountz = accountss[0];
        console.log(accountz)
    }
    getAccount();
    console.log('Injected web3 found!');
}else {
    //如果浏览器没有web3，那么尝试使用本地环境
    web3.setProvider("http://127.0.0.1:8545");
    console.log('local web3 found!')
}
//导出
module.exports = web3;