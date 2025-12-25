import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ThemeContext from 'contexts/ThemeContext';

const ThemeSelector = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'homepage' });
  const { theme, setTheme } = useContext(ThemeContext);

  const onChange = (e) => setTheme(e.target.value);

  return (
    <Form.Select
      value={theme}
      onChange={onChange}
      aria-label={t('theme')}
      style={{ width: '200px' }}
      className="theme-selector-no-arrow"
    >
      <option value="classic">{t('themeClassic')}</option>
      <option value="christmas">{t('themeChristmas')}</option>
    </Form.Select>
  );
};

export default ThemeSelector;
