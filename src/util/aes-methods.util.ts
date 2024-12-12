import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export const encrypt = async (
  buffer: Buffer,
  secretKey: string,
  salt: string,
  iv?: Buffer,
) => {
  const algorithm = 'aes-256-ctr';

  iv = iv ?? generateIv();

  const key = (await promisify(scrypt)(secretKey, salt, 32)) as Buffer;

  const cipher = createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);

  return encrypted;
};

export const decrypt = async (
  encrypted: Buffer,
  secretKey: string,
  salt: string,
) => {
  const algorithm = 'aes-256-ctr';
  const iv = encrypted.slice(0, 16);
  encrypted = encrypted.slice(16);

  const key = (await promisify(scrypt)(secretKey, salt, 32)) as Buffer;

  const decipher = createDecipheriv(algorithm, key, iv);

  const decrpyted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrpyted;
};

export const generateIv = () => randomBytes(16);

export const IV_REGEX = /^[a-fA-F0-9]{32}$/;
