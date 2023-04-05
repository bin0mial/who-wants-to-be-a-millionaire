import { useContext, useEffect, useState } from 'react';
import FirebaseContext from 'contexts/FirebaseContext';
import getQuestions from 'apis/firebase/questions/getQuestions';
import QuestionContext from 'contexts/QuestionContext';
import { decompressObjectifyLZW } from 'helpers/compressors';

const initQuestions = () => {
  const { db } = useContext(FirebaseContext);
  const { setQuestions, setIsCustom } = useContext(QuestionContext);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const [isInitialized, setIsInitialized] = useState(false);

  const postFetchCallback = (result) => {
    setIsInitialized(true);
    return decompressObjectifyLZW(result);
  };

  useEffect(() => {
    if (urlSearchParams.get('shareId')) {
      setQuestions(getQuestions({ db, docId: urlSearchParams.get('shareId') }, { postFetch: postFetchCallback }));
      setIsCustom(true);
    } else {
      setIsInitialized(true);
    }
  }, []);

  return isInitialized;
};

export default initQuestions;
