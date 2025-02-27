import crypto from 'crypto';

export class CryptoUtil {
  private algorithm = 'aes-256-cbc';
  private enc_key = Buffer.from(process.env.CRYPTO_ENC_KEY, 'hex');
  private iv = Buffer.from(process.env.CRYPTO_IV, 'hex');

  // AES Encrypt Data transfer
  async encryptAES(text: string) {
    const cipher = crypto.createCipheriv(this.algorithm, this.enc_key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  // AES Decrypt Data transfer
  async decryptAES(encrypted: string) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.enc_key,
      this.iv,
    );
    const decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
  }
}
