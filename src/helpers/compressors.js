import lzString from 'lz-string';

const compressLZW = (dataObject) => ({
  output: lzString.compressToEncodedURIComponent(dataObject),
  contentType: 'application/vnd.millionaire.save;charset=utf-8;',
  ext: '.millarsave',
});

const decompressLZW = (compressedString) => lzString.decompressFromEncodedURIComponent(compressedString);

const decompressObjectifyLZW = (compressedString) => JSON.parse(decompressLZW(compressedString));

export { compressLZW, decompressLZW, decompressObjectifyLZW };
