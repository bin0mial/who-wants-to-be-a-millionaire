import i18n from 'i18n';

const exportObject = (objectData, compressionFn = null) => {
  const stringJson = JSON.stringify(objectData);
  const { output, contentType, ext } = compressionFn ? compressionFn(stringJson) : {
    output: stringJson,
    contentType: 'application/json;charset=utf-8;',
    ext: '.json',
  };
  const filename = `${i18n.t('export')}${ext}`;
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    const blob = new Blob([decodeURIComponent(encodeURI(output))], { type: contentType });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    a.download = filename;
    a.href = `data:${contentType},${encodeURIComponent(output)}`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { exportObject };
