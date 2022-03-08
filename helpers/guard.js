import { getSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from 'components/Loader';

const RouterGuard = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getSession().then(session => {
            if (!session) {
                router.push('/users/sign_in')
            } else {
                setLoading(false)
            }
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (loading) {
        return <Loader full={true} />
    }

    return (
        <>
            {props.children}
        </>
    )

}


export default RouterGuard;