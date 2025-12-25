import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { QuestionContext } from 'contexts/QuestionContext';

const FLAG_MAP = {
  en: '🇬🇧',
  ar: '🇸🇦',
};

const LanguageChanger = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'homepage' });
  const { setQuestions, isCustom } = useContext(QuestionContext);

  const changeLanguage = (lang) => () => {
    i18n.changeLanguage(lang);
    if (!isCustom) setQuestions(null);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-language">
        <FontAwesomeIcon icon={faGlobe} className="mx-1" />
        <span className="mx-1">{t('language')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {i18n.languages.map((language) => (
          <Dropdown.Item
            key={language}
            active={language === i18n.language}
            onClick={changeLanguage(language)}
            aria-current={language === i18n.language}
          >
            <span className="me-2">{FLAG_MAP[language] || '🌐'}</span>
            <strong className="me-2">{i18n.getResource(language, 'translation', 'homepage.languageName')}</strong>
            <small className="text-muted">{language}</small>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageChanger;
