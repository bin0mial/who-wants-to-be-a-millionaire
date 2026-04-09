import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ThemeContext from 'contexts/ThemeContext';
import { allThemes } from 'themes/registry';

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
      {allThemes.map((themeEntry) => (
        <option key={themeEntry.id} value={themeEntry.id}>
          {`${themeEntry.icon} ${t(themeEntry.labelKey)}`}
        </option>
      ))}
    </Form.Select>
  );
};

export default ThemeSelector;
