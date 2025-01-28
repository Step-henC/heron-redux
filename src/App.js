import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import PageLayout from './pages/PageLayout/PageLayout';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Toaster />
          <PageLayout />
      </PersistGate>
    </Provider>
  );
}

export default App;
