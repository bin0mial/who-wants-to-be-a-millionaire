import md5 from 'md5';

const md5Hash = (text) => md5(text);

const checkMd5 = (text, hash) => md5Hash(text) === hash;

export { md5Hash, checkMd5 };
