import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSignOut } from 'store/actions/userAction';

const Header = () => {

    const [small, setSmall] = useState(false)
    const [navbarCollapse, setNavbarCollapse] = useState(false)

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener('scroll', () => {
                setSmall(window.pageYOffset > 200)
            })
        }
    }, [])

    const signOutUser = () => {
        dispatch(userSignOut('So soon?? Bye!!'))
        router.push('/')
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-light fixed-top py-3 ${small ? "navbar-shrink" : ""}`} id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link href="/" onClick={() => setNavbarCollapse(false)}>
                    <a className="navbar-brand">The Smelly Cats</a>
                </Link>
                <button
                    className="navbar-toggler navbar-toggler-right"
                    type="button"
                    onClick={() => setNavbarCollapse(!navbarCollapse)}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className={`collapse navbar-collapse ${navbarCollapse ? 'show' : null}`}>
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item">
                            <Link href="/shows" onClick={() => setNavbarCollapse(false)}>
                                <a className="nav-link">Shows</a>
                            </Link>
                        </li>
                        <li className="nav-item" onClick={() => setNavbarCollapse(false)}>
                            <Link href="/contact">
                                <a className="nav-link">Contact</a>
                            </Link>
                        </li>
                        {user && !user.auth ?
                            <li className="nav-item" onClick={() => setNavbarCollapse(false)}>
                                <Link href="/users/sign_in">
                                    <a className="nav-link">Sign in</a>
                                </Link>
                            </li>
                            : null
                        }
                        {user && user.auth ?
                            <>
                                <li className="nav-item" onClick={() => setNavbarCollapse(false)}>
                                    <Link href="/users/dashboard">
                                        <a className="nav-link">Dashboard</a>
                                    </Link>
                                </li>
                                <li className="nav-item" onClick={() => setNavbarCollapse(false)}>
                                    <a className="nav-link"
                                        style={{ cursor: 'pointer' }}
                                        onClick={signOutUser}
                                    >Sign out</a>
                                </li>
                            </>
                            : null
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;