import Featured from 'components/Home/Featured';
import Newsletter from 'components/Home/Newsletter';
import Shows from 'components/Home/Shows';
import connectToDb from 'database/db';
import { getAllShows } from 'database/services/showService';
import { toJson } from 'helpers/functions';
import React from 'react';

export const getServerSideProps = async () => {
  await connectToDb();
  try {
    const shows = await getAllShows('_id', 'desc', 3, 0);
    return { props: { shows: toJson(shows) } }
  }
  catch (error) {
    return { props: { shows: [] } }
  }
}

const Home = ({ shows }) => {
  return (
    <>
      <Featured />
      <Shows shows={shows} />
      <Newsletter />
    </>
  )
}

export default Home