import { useState } from 'react'
import Masonry from 'react-masonry-css';
import axios from 'axios';

import connectToDb from 'database/db';
import { getAllShows } from 'database/services/showService'
import { toJson } from 'helpers/functions';
import Card from 'components/Home/Card'
import { Button } from '@mui/material';


export const getServerSideProps = async () => {
    await connectToDb();
    try {
        const limit = 3
        const shows = await getAllShows('_id', 'desc', limit, 0);
        const anymore = shows.length > limit ? true : false
        return {
            props: {
                shows: toJson(shows),
                anymore
            }
        }
    } catch (error) {
        return { props: { shows: [], anymore } }
    }
}


const ShowsPage = (props) => {

    const [noMore, setNoMore] = useState(!props.anymore);
    const [shows, setShows] = useState(props.shows);

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };

    const loadMorePosts = () => {
        const skip = shows.length;

        axios.get(`/api/shows/getAll?limit=3&skip=${skip}`).then(response => {
            const newState = [
                ...shows,
                ...response.data.shows
            ];
            setShows(newState);
            if (response.data.shows.length <= 0) {
                setNoMore(true)
            }

        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <div className="container page_container">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {shows.map(show => (
                    <Card show={show} key={show._id} />
                ))}
            </Masonry>
            {!noMore && (
                <Button variant="contained" onClick={loadMorePosts}>
                    Load more
                </Button>
            )}
        </div>
    )

}

export default ShowsPage;