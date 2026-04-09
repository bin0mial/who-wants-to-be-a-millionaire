import md5 from 'md5';

const sha256Hash = async (text) => {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const checkHash = async (text, hash) => {
  const sha256 = await sha256Hash(text);
  if (sha256 === hash) return true;
  return md5(text) === hash;
};

export { sha256Hash, checkHash };
