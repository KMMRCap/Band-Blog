import Head from 'next/head';
import React, { useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux'
import { showToast } from 'helpers/functions'
import { ToastContainer } from 'react-toastify';
import { clearNotification } from 'store/actions/notificationAction'

const MainLayout = (props) => {

    const notif = useSelector(state => state.notification);

    const dispatch = useDispatch();

    useEffect(() => {
        if (notif && notif.error) {
            const msg = notif.msg ? notif.msg : 'Error';
            showToast('ERROR', msg);
            dispatch(clearNotification());
        }
        if (notif && notif.success) {
            const msg = notif.msg ? notif.msg : 'Good job!!';
            showToast('SUCCESS', msg);
            dispatch(clearNotification());
        }
    }, [notif, dispatch])


    return (
        <>
            <Head>
                <title>The Smelly Cats</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="The homepage of the smelly cats, the greatest band in the whole world" />
                <meta name="keywords" content="Music, shows, smelly cats" />
                <meta name="author" content="The smelly cats" />
            </Head>
            <Header />
            {props.children}
            <ToastContainer />
            <Footer />
        </>
    );
}

export default MainLayout;