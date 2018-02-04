import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import coinInfoApp from './reducers';
import App from './components/App';

const store = createStore(coinInfoApp);

const root = document.getElementById('root');
const load = () => {
    render(<AppContainer><Provider store={store}><App /></Provider></AppContainer>, root);
};

// This is needed for Hot Module Replacement
if (module.hot) {
    module.hot.accept('./components/App', load);
}

load();
