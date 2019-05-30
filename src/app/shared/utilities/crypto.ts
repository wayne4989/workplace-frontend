import * as crypto from 'crypto';

export class CryptoUtilities {
  constructor () {}

  public static cipher (value): string {
    let cipher = crypto.createCipher('aes192', 'sample cipher here');
    let encrypted = cipher.update(value.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  public static decipher (value): string {
    let decipher = crypto.createDecipher('aes192', 'sample cipher here');
    let decrypted = decipher.update(value.toString(), 'hex', 'utf8');

    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
