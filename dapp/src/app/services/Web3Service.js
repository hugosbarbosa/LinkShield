import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x061f802D165FCDA606C79412BC774A9b13dC04ab";

export async function connectContract() {
    if (!window.ethereum) throw new Error("Sem MetaMask instalada");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error("Carteira não permitida");

    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: accounts[0] });
}

export async function addLink({ url, linkId, feeInWei }) {
    const contract = await connectContract();
    return contract.methods.addLink(url, linkId, feeInWei).send();
}

export async function getLink(linkId) {
    const contract = await connectContract();
    return contract.methods.getLink(linkId).call();
}

export async function payLink(linkId, valueInWei) {
    const contract = await connectContract();
    return contract.methods.payLink(linkId).send({
        value: valueInWei
    });
}