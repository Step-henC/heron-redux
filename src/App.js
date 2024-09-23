import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import PageLayout from './pages/PageLayout/PageLayout';
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <PageLayout />
      </PersistGate>
    </Provider>
  );
}

export default App;
