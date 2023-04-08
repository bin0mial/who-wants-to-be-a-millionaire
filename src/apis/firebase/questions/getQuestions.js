import { doc, getDoc } from 'firebase/firestore';
import wrapPromise from 'apis/warpPromise';

const getQuestions = ({ db, docId }, opts = {}) => (
  getDoc(doc(db, 'public_questions', docId))
    .then((resp) => resp.data().sharedQuestions)
    .then((respText) => opts?.postFetch(respText) || respText)
    .catch((error) => opts?.postFetch(undefined, error))
);
export default wrapPromise(getQuestions);
