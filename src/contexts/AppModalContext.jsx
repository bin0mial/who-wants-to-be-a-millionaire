import { createContext, useMemo, useReducer } from 'react';
import GeneralModal from 'components/Shared/Modals/GeneralModal';
import PropTypes from 'prop-types';
import { actionTypes, appModalReducer } from 'reducers/appModalReducer';

const AppModalContext = createContext({
  showAppModal: () => {},
  hideAppModal: () => {},
});
export default AppModalContext;

const AppModalProvider = ({ children }) => {
  const [appModal, dispatch] = useReducer(appModalReducer, {
    show: false,
    headerText: '',
    children: null,
    actions: [],
  });

  const showAppModal = (headerText = '', modalChildren = null, actions = []) => {
    dispatch({
      type: actionTypes.SHOW,
      data: {
        show: true, headerText, children: modalChildren, actions,
      },
    });
  };

  const hideAppModal = () => {
    dispatch({ type: actionTypes.HIDE });
  };

  const contextData = useMemo(() => ({
    showAppModal,
    hideAppModal,
  }), []);

  return (
    <AppModalContext.Provider value={contextData}>
      <GeneralModal
        show={appModal.show}
        setShow={hideAppModal}
        headerText={appModal.headerText}
        actions={appModal.actions}
        isAppModal
      >
        {appModal.children}
      </GeneralModal>
      {children}
    </AppModalContext.Provider>
  );
};

AppModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppModalProvider };
