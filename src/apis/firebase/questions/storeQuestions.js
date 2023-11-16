import { addDoc, collection } from 'firebase/firestore';
import wrapPromise from 'apis/warpPromise';

const storeQuestions = ({ db, ...sharedQuestions }, opts = {}) => (
  addDoc(collection(db, 'public_questions'), {
    ...sharedQuestions,
  }).then((resp) => resp.id)
    .then((respText) => opts?.postStore(respText) || respText)
);
export default wrapPromise(storeQuestions);
