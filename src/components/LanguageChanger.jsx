import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import QuestionContext from '../contexts/QuestionContext';

const LanguageChanger = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'homepage' });
  const { setQuestions, isCustom } = useContext(QuestionContext);

  const changeLanguage = (lang) => () => {
    i18n.changeLanguage(lang);
    if (!isCustom) setQuestions(null);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <FontAwesomeIcon icon={faGlobe} className="mx-1" />
        <span className="mx-1">{t('language')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {i18n.languages.filter((lng) => lng !== i18n.language).map((language) => (
          <Dropdown.Item
            key={language}
            onClick={changeLanguage(language)}
          >
            {i18n.getResource(language, 'translation', 'homepage.languageName')}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageChanger;
