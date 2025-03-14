import { ethers } from "ethers";
import abi from "../abi.json";

const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

function MintProofButton({ user }) {
  const mintProof = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const tx = await contract.mintProof("0x000000000000000000000000000000000000dead", "room1");
      await tx.wait();
      alert("Chat proof minted!");
    } catch (err) {
      console.error(err);
      alert("Failed to mint.");
    }
  };

  return (
    <button onClick={mintProof} className="mint-btn">
      Mint Proof of Chat 🧾
    </button>
  );
}

export default MintProofButton;
