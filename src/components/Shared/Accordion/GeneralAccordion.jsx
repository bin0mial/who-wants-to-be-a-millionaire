import { Accordion } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './GeneralAccordion.css';

const GeneralAccordion = ({
  items, defaultActiveKey, alwaysOpen, mainKey,
}) => (
  <Accordion
    {...(defaultActiveKey && { defaultActiveKey })}
    alwaysOpen={alwaysOpen}
  >
    {items.map((item) => (
      <Accordion.Item key={`${mainKey} ${item.eventKey}`} eventKey={item.eventKey}>
        <Accordion.Header>{item.header}</Accordion.Header>
        <Accordion.Body>{item.body}</Accordion.Body>
      </Accordion.Item>
    ))}
  </Accordion>
);

GeneralAccordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    eventKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    body: PropTypes.node.isRequired,
  })).isRequired,
  defaultActiveKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alwaysOpen: PropTypes.bool,
  mainKey: PropTypes.string.isRequired,
};

GeneralAccordion.defaultProps = {
  defaultActiveKey: null,
  alwaysOpen: false,
};

export default GeneralAccordion;
