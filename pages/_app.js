import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainLayout from 'components/MainLayout';

import { Provider, useDispatch } from 'react-redux'
import { store } from 'store'
import { createWrapper } from 'next-redux-wrapper'
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import { autoSignIn } from 'store/actions/userAction';
import Loader from 'components/Loader';

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        dispatch(autoSignIn(session))
      }
      setLoading(false)
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Provider store={store}>
      {loading ?
        <Loader full />
        :
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      }
    </Provider>
  )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
