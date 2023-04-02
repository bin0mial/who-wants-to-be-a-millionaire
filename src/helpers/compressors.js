import lzString from 'lz-string';

const compressLZW = (dataObject) => ({
  output: lzString.compressToEncodedURIComponent(dataObject),
  contentType: 'application/vnd.millionaire.save;charset=utf-8;',
  ext: '.millarsave',
});

const decompressLZW = (compressedObject) => lzString.decompressFromEncodedURIComponent(compressedObject);

export { compressLZW, decompressLZW };
