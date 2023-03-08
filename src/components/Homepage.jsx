import { Trans, useTranslation } from 'react-i18next';
import { Field, Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { useContext, useState } from 'react';
import LanguageChanger from './LanguageChanger';
import './Homepage.css';
import QuestionContext from '../contexts/QuestionContext';
import FormikInput from './Shared/Form/FormikInput/FormikInput';
import CustomQuestionsModal from './Settings/CustomQuestions/CustomQuestionsModal';
import GameControlContext from '../contexts/GameControlContext';
import AppSettingsModal from './Settings/AppSettings/AppSettingsModal';

const Homepage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'homepage' });
  const { startGame } = useContext(GameControlContext);
  const [draggingFile, setDraggingFile] = useState(false);
  const [isReadyFile, setIsReadyFile] = useState(true);
  const { setQuestions, setIsCustom } = useContext(QuestionContext);

  const readQuestions = (file, onLoad) => {
    setIsReadyFile(false);
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
      setQuestions(JSON.parse(e.target.result));
      if (onLoad) onLoad(e);
      setIsReadyFile(true);
    };
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    startGame();
  };

  return (
    <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center text-dark mt-5 mb-5">
      <div className="mb-5 d-flex gap-2">
        <LanguageChanger />
        <AppSettingsModal />
      </div>
      <div className="img-thumbnail home-form">
        <div className="row mb-4">
          <div className="col-12">
            <h2>{t('appName')}</h2>
            <div>{t('aboutApp')}</div>
          </div>
        </div>
        <Formik initialValues={{ name: '', questionsJsonFile: null }} onSubmit={onSubmit}>
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
                        accept={{ 'application/json': ['.json'] }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()} className="dragdrop">
                            <Form.Label htmlFor={field.name}>{t('form.customJson')}</Form.Label>
                            <div className={`dropzone${draggingFile ? ' dragging' : ''}`}>
                              <input {...getInputProps()} id={field.name} />
                              {draggingFile ? (<p>Drop Here</p>) : (
                                <>
                                  <p>{t('form.dropJsonFileHere')}</p>
                                  {field.value?.path && `${t('form.selectedJsonFile')}: ${field.value?.path}`}
                                </>
                              )}
                            </div>
                            {' '}
                          </div>
                        )}
                      </Dropzone>
                      <Form.Text muted>
                        <Trans
                          i18nKey="homepage.form.jsonFileHint"
                          components={{
                            // eslint-disable-next-line max-len
                            1: <a target="_blank" href="https://www.jeremydorn.com/json-editor?schema=N4IgJAzgxgFgpgWwIYgFwhgF0wB1QenwCsIB7AOwFpp5kA6UgJwHN8ATRpAM00oAYALPhqIkAYhAAaEJgCWmADZw0IAOoxSAAgDuScpgibMWgEZxNSTQlkKFsiklmNzARQCucCHIqaAynEwpGQBPHGV0JEZOYKD5RAg0UExQ8JBSEyI4KEDpZwBHNyc4NjQAbRBZEukCz29yINIcOoTpPQhtOEYQAF1pHEZGzrlPRIqS1CSUlVl9OGZOoOtyWQQ3BDQARgBfao8ve3qJkLCVL0YZ5kWZgBk4cmZMGE2dtKaDhKPkk/R0zOyg/KFZzjcooaQmIJQIIlXogfqDRjDD6gFCfKboM4XK7kW73R7PcGjL6pTH3bG4h5PVDbaRQtHfECky7SJYU/HUl7jSYMpnku6U55bF5tDpdekkzDnMksm789kbaR3NZlEBgkAQ2nQnpC6RyRSpdRaXT6QzGTRmCxWGx2BxFEBCoAA=&value=NoXSAA==&theme=foundation5&iconlib=fontawesome4&object_layout=normal&show_errors=always&required_by_default&disable_edit_json&disable_collapse&disable_properties&disable_array_delete_all_rows&disable_array_delete_last_row" rel="noreferrer">URL</a>,
                          }}
                        />
                      </Form.Text>
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
      <div className="row fixed-bottom text-center text-white">
        <div className="col-12 mb-2">
          <Trans
            i18nKey="homepage.footer"
            values={{ githubUser: '@bin0mial', appName: t('appName') }}
            components={{
              1: <a href="https://github.com/bin0mial">Github</a>,
              3: <a href="https://github.com/bin0mial/who-wants-to-be-a-millionaire">Github Repo</a>,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
