import { addDoc, collection } from 'firebase/firestore';
import wrapPromise from 'apis/warpPromise';

const storeQuestions = ({ db, questions }, opts = {}) => (
  addDoc(collection(db, 'public_questions'), {
    questions,
  }).then((resp) => resp.id)
    .then((respText) => opts?.postStore(respText) || respText)
);
export default wrapPromise(storeQuestions);
