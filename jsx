import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { useState } from "react";

export default function App() {
  const address = useAddress();
  const { contract } = useContract("0xB87D3335399f0AD77139D54ea5CaC6D8747043e5", "nft-drop");
  const { mutateAsync: claim, isLoading } = useContractWrite(contract, "claim");

  const mint = async () => {
    try {
      const data = await claim({ args: [1] });
      alert("🎉 NFT Minted!");
      console.log(data);
    } catch (err) {
      alert("❌ Mint failed.");
    }
  };

  return (
    <main style={{
      backgroundColor: 'black',
      color: 'yellow',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1>Zama Secret NFT</h1>
      {address ? (
        <>
          <p>Wallet: {address.slice(0, 6)}...{address.slice(-4)}</p>
          <button onClick={mint} disabled={isLoading}>
            {isLoading ? "Minting..." : "Mint NFT"}
          </button>
        </>
      ) : (
        <p>Please connect wallet using top bar</p>
      )}
    </main>
  );
}
