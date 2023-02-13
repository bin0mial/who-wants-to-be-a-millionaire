import i18n from '../i18n';

const exportToJson = (objectData) => {
  const filename = `${i18n.t('export')}.json`;
  const contentType = 'application/json;charset=utf-8;';
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    const blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    a.download = filename;
    a.href = `data:${contentType},${encodeURIComponent(JSON.stringify(objectData))}`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { exportToJson };
