import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Answer = ({
  id, answer, handleChoice, isSelected, wronglySelected, rightAnswer, disabled,
}) => {
  const { t } = useTranslation('questions');
  const classNames = [
    'answer',
    'w-100',
    isSelected ? 'selected' : '',
    wronglySelected ? 'wrong' : '',
    rightAnswer ? 'correct' : '',
  ].filter(Boolean).join(' ');

  return (
    <button type="button" className={classNames} key={id} onClick={handleChoice(id)} disabled={disabled}>
      <div className="row w-100 gx-0">
        <div className="col-2 mx-2">
          {t(`choices.${id.toLowerCase()}`)}
          .
        </div>
        <div className="col-9">{answer}</div>
      </div>
    </button>
  );
};

Answer.propTypes = {
  id: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  handleChoice: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  wronglySelected: PropTypes.bool.isRequired,
  rightAnswer: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

Answer.defaultProps = {
  disabled: false,
};

export default Answer;
