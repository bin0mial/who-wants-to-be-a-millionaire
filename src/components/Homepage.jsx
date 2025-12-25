import { Trans, useTranslation } from 'react-i18next';
import { Field, Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { useContext, useState } from 'react';
import ReactGA from 'react-ga4';
import { decompressLZW } from 'helpers/compressors';
import { QuestionContext } from 'contexts/QuestionContext';
import FormikInput from 'components/Shared/Form/FormikInput/FormikInput';
import GameControlContext from 'contexts/GameControlContext';
import { Helmet } from 'react-helmet';
import i18n from 'i18n';
import ThemeContext from 'contexts/ThemeContext';
import LanguageChanger from './LanguageChanger';
import ThemeSelector from './ThemeSelector';
import './Homepage.css';
import CustomQuestionsModal from './Settings/CustomQuestions/CustomQuestionsModal';
import AppSettingsModal from './Settings/AppSettings/AppSettingsModal';
import PlayerContext from '../contexts/PlayerContext';

const Homepage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'homepage' });
  const { startGame } = useContext(GameControlContext);
  const { theme } = useContext(ThemeContext);
  const [draggingFile, setDraggingFile] = useState(false);
  const [isReadyFile, setIsReadyFile] = useState(true);
  const { setQuestions, setIsCustom } = useContext(QuestionContext);
  const { playerInfo, setPlayerInfo } = useContext(PlayerContext);

  const readQuestions = (file, onLoad) => {
    ReactGA.event({
      category: 'gameQuestions',
      action: 'Load custom game questions',
    });
    setIsReadyFile(false);
    const fileReader = new FileReader();
    fileReader.readAsText(file, 'utf8');
    fileReader.onload = (e) => {
      const questionsStr = decompressLZW(e.target.result);
      setQuestions(JSON.parse(questionsStr));
      if (onLoad) onLoad(e);
      setIsReadyFile(true);
    };
  };

  const onSubmit = (values, { setSubmitting }) => {
    setPlayerInfo({ ...values });
    ReactGA.event({
      category: 'gamePlay',
      action: 'Start the game',
      label: 'Play game Button',
    });
    setSubmitting(false);
    startGame();
  };

  const renderSnow = () => {
    const flakes = Array.from({ length: 28 }).map(() => {
      const left = Math.random() * 100;
      const size = 4 + Math.random() * 6;
      const duration = 6 + Math.random() * 8;
      const delay = Math.random() * -20;
      const id = Math.random().toString(36).slice(2, 9);
      return (
        <div
          key={`flake-${id}`}
          className="christmas-snowflake"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    });

    return (
      <div className="christmas-snow" aria-hidden>
        {flakes}
      </div>
    );
  };

  return (
    <>
      {theme === 'christmas' && (
        <>
          <div className="christmas-garland-left" />
          <div className="christmas-garland-right" />
          {renderSnow()}
        </>
      )}

      <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center text-dark mt-5 mb-5">
      <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.dir(i18n.language) }} />
      <div className="mb-5 d-flex gap-2">
        <LanguageChanger />
        <ThemeSelector />
        <AppSettingsModal />
      </div>
      <div className="img-thumbnail home-form">
        <div className="row mb-4">
          <div className="col-12">
            <h2>{t('appName')}</h2>
            <div>{t('aboutApp')}</div>
          </div>
        </div>
        <Formik initialValues={{ name: playerInfo.name, questionsJsonFile: null }} onSubmit={onSubmit}>
          {({ handleSubmit, isSubmitting, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <h3>{t('form.header')}</h3>
              <div>
                <FormikInput name="name" label={t('form.yourName')} />
                <Field name="questionsJsonFile" type="file" className="">
                  {({ field }) => (
                    <div className="mb-3">
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          setFieldValue(field.name, acceptedFiles[0]);
                          readQuestions(acceptedFiles[0], () => {
                            setIsCustom(true);
                          });
                        }}
                        onDragEnter={() => { setDraggingFile(true); }}
                        onDragLeave={() => { setDraggingFile(false); }}
                        onDropAccepted={() => { setDraggingFile(false); }}
                        onDropRejected={() => { setDraggingFile(false); }}
                        accept={{ 'application/vnd.millionaire.save': ['.millarsave'] }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()} className="dragdrop">
                            <Form.Label htmlFor={field.name}>{t('form.customQuestionsFile')}</Form.Label>
                            <div className={`dropzone${draggingFile ? ' dragging' : ''}`}>
                              <input {...getInputProps()} id={field.name} />
                              {draggingFile ? (<p>Drop Here</p>) : (
                                <>
                                  <p>{t('form.dropQuestionsFileHere')}</p>
                                  {field.value?.path && `${t('form.selectedQuestionsFile')}: ${field.value?.path}`}
                                </>
                              )}
                            </div>
                            {' '}
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  )}
                </Field>

                <CustomQuestionsModal />

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={isSubmitting || !isReadyFile}
                >
                  {t('form.startGame')}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="row mt-3 text-center text-white">
        <div className="col-12 mb-2">
          <Trans
            i18nKey="homepage.footer"
            values={{ appName: t('appName') }}
            components={{
              1: <a href="https://github.com/bin0mial">Github</a>,
              3: <a href="https://github.com/bin0mial/who-wants-to-be-a-millionaire">Github Repo</a>,
            }}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Homepage;
