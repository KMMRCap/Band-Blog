import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Shows = ({ shows }) => {
    return (
        <>
            <section className="page-section">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-1">
                                Check out our shows this year
                            </h2>
                            <Link passHref href="/shows">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Watch all the shows
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <div id="home_events">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        {shows?.map(show => (
                            <div className="col-lg-4 col-sm-6" key={show._id}>
                                <Link href={`/shows/${show.slug}`}>
                                    <a className="event-box">
                                        <Image
                                            src={`/images/venues/${show.image}`}
                                            alt={show.title}
                                            width="1920"
                                            height="1080"
                                            layout="responsive"
                                            className="img-fluid"
                                        />
                                        <div className="event-box-caption">
                                            <div className="project-category text-white-50">
                                                {show.date}
                                            </div>
                                            <div className="project-name">
                                                {show.venue}
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shows;