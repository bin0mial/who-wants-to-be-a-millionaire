import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const LanguageChanger = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'homepage' });

  const changeLanguage = (lang) => () => {
    i18n.changeLanguage(lang);
  };

  return (
    <Dropdown className="mb-5">
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <span className="mx-1">{t('language')}</span>
        <FontAwesomeIcon icon={faGlobe} className="mx-1" />
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
