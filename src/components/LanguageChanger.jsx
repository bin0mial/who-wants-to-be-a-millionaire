import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const LanguageChanger = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'homepage' });

  const changeLanguage = (lang) => () => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.dir(i18n.language) }} />
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
    </>
  );
};

export default LanguageChanger;
