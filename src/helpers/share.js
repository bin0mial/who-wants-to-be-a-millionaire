import { compressLZW } from 'helpers/compressors';
import { serverTimestamp } from 'firebase/firestore';

const prepareShareQuestions = (questionsObject) => {
  const questionsCount = questionsObject.questions.length;
  const sharedQuestions = compressLZW(JSON.stringify(questionsObject)).output;
  const timestamp = serverTimestamp();
  return { sharedQuestions, questionsCount, timestamp };
};

// eslint-disable-next-line import/prefer-default-export
export { prepareShareQuestions };
