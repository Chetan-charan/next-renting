import '../styles/globals.css'
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import allReducers from '../reducers';

const store = createStore(allReducers);

function MyApp({ Component, pageProps }) {

  return (
    <>
    <Layout/>
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
    </>
  )
 
}

export default MyApp
