import CryptoJS from 'crypto-js';

const SECRET_KEY = 'cheie-secreta-wave';

export function encryptData(data) {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decryptData(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}
