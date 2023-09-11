import { useContext, useEffect, useState } from 'react';
import FirebaseContext from 'contexts/FirebaseContext';
import getQuestions from 'apis/firebase/questions/getQuestions';
import { QuestionContext, QuestionPasswordContext } from 'contexts/QuestionContext';
import { decompressObjectifyLZW } from 'helpers/compressors';
import { Trans, useTranslation } from 'react-i18next';
import appModalContext from 'contexts/AppModalContext';

const initQuestions = () => {
  const { t } = useTranslation('questions');
  const { db } = useContext(FirebaseContext);
  const { setQuestions, setIsCustom } = useContext(QuestionContext);
  const { lockPasswordQuestions } = useContext(QuestionPasswordContext);
  const { showAppModal } = useContext(appModalContext);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const [isInitialized, setIsInitialized] = useState(false);

  const postFetchCallback = (result, error) => {
    setIsInitialized(true);
    if (error) {
      showAppModal(
        t('invalidShareLink'),
        <Trans
          i18nKey="questions.invalidShareLinkMessage"
          values={{ url: window.location.href }}
          components={{
            1: <span className="img-thumbnail bg-light" />,
          }}
        />,
      );
    }
    const sharedQuestions = decompressObjectifyLZW(result);
    setQuestions(sharedQuestions.questions);
    setIsCustom(true);
    if (sharedQuestions.password) {
      lockPasswordQuestions(sharedQuestions.password);
    }
  };

  useEffect(() => {
    if (urlSearchParams.get('shareId')) {
      getQuestions({ db, docId: urlSearchParams.get('shareId') }, { postFetch: postFetchCallback });
    } else {
      setIsInitialized(true);
    }
  }, []);

  return isInitialized;
};

export default initQuestions;
