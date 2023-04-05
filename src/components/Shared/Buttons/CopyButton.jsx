import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Button } from 'react-bootstrap';
import { copyString } from 'helpers/strings';

const CopyButton = ({ text }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common.copy' });
  const [isCopied, setIsCopied] = useState(null);

  const copyStatus = {
    text: {
      text: t('text'),
      variant: 'primary',
    },
    success: {
      text: t('success'),
      variant: 'success',
    },
    fail: {
      text: t('fail'),
      variant: 'danger',
    },
  };

  useEffect(() => {
    if (isCopied !== null) {
      setTimeout(() => {
        setIsCopied(null);
      }, 5000);
    }
  }, [isCopied]);

  const display = useMemo(() => {
    if (isCopied) {
      return copyStatus.success;
    } if (isCopied === false) {
      return copyStatus.fail;
    }
    return copyStatus.text;
  }, [isCopied]);

  const copyText = useCallback(() => {
    copyString(text, () => { setIsCopied(true); }, () => setIsCopied(false));
  }, [text]);

  return <Button variant={display.variant} onClick={copyText}>{display.text}</Button>;
};

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyButton;
