import PropTypes from 'prop-types';

function Answer({
  id, answer, handleChoice, isSelected, wronglySelected, rightAnswer,
}) {
  const classNames = [
    'answer',
    isSelected ? 'selected' : '',
    wronglySelected ? 'wrong' : '',
    rightAnswer ? 'correct' : '',
  ].filter(Boolean).join(' ');

  return (
    <button type="button" className={classNames} key={id} onClick={handleChoice(id)}>
      <div>
        {id.toUpperCase()}
        .
      </div>
      <div>{answer}</div>
    </button>
  );
}

Answer.propTypes = {
  id: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  handleChoice: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  wronglySelected: PropTypes.bool.isRequired,
  rightAnswer: PropTypes.bool.isRequired,
};

export default Answer;
