import lzString from 'lz-string';

const compressLZW = (dataObject) => ({
  output: lzString.compressToEncodedURIComponent(dataObject),
  contentType: 'application/vnd.millionaire.save;charset=utf-8;',
  ext: '.millarsave',
});

const decompressLZW = (compressedString) => lzString.decompressFromEncodedURIComponent(compressedString);

const decompressObjectifyLZW = (compressedString) => {
  try {
    return JSON.parse(decompressLZW(compressedString));
  } catch {
    return null;
  }
};

export { compressLZW, decompressLZW, decompressObjectifyLZW };
