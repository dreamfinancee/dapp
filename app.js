import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import defineProperty from '@babel/runtime/helpers/defineProperty';
import nacl from 'tweetnacl';
import { Buffer } from 'buffer'; // Importar el polyfill para Buffer
import BN from 'bn.js';
import bs58 from 'bs58';
import { struct } from 'superstruct';
import { Client as WebSocketClient, Server as WebSocketServer } from 'rpc-websockets';
import { Client as JaysonClient } from 'jayson';

// Especifica tu RPC personalizado y API key aquí
const RPC_URL = process.env.VITE_RPC_URL;
const API_KEY = process.env.VITE_API_KEY;
const connection = new Connection(`${RPC_URL}?api-key=${API_KEY}`, 'confirmed');

let wallet = null;

document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (!wallet) {
        wallet = new PhantomWalletAdapter();
        await wallet.connect();
        document.getElementById('connect-wallet').innerText = 'Desconectar Wallet';
        fetchBalance();
    } else {
        wallet.disconnect();
        wallet = null;
        document.getElementById('connect-wallet').innerText = 'Conectar Wallet';
        document.getElementById('balance').innerText = 'Balance: --';
    }
});

async function fetchBalance() {
    if (wallet && wallet.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        document.getElementById('balance').innerText = `Balance: ${balance / LAMPORTS_PER_SOL} SOL`;
    }
}
