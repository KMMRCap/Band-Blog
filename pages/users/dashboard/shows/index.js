import React, { useState } from 'react';
import AdminLayout from 'components/AdminLayout';
import connectToDb from 'database/db';
import { paginateShows } from 'database/services/showService';
import { toJson } from 'helpers/functions';
import axios from 'axios';
import PaginateBlock from 'components/Admin/Paginate';
import { useDispatch } from 'react-redux';
import { successDispatcher, errorDispatcher } from 'store/actions/notificationAction';


export const getServerSideProps = async () => {
    await connectToDb();
    const shows = await paginateShows(1 /*page*/, 2 /*limit*/);
    if (!shows) {
        return {
            props: {
                shows: []
            }
        }
    }
    return {
        props: {
            shows: toJson(shows)
        }
    }
}


const ShowsAdmin = ({ shows }) => {

    const dispatch = useDispatch()

    const limit = 2;

    const [showsPag, setShowsPag] = useState(shows);
    const [currentPage, setCurrentPage] = useState(1);
    const [removeModal, setRemoveModal] = useState(false);
    const [toRemove, setToRemove] = useState(null);


    const gotoPage = (page) => {
        getShows({ page: page, limit });
        setCurrentPage(page);
    }

    const getShows = (values) => {
        axios.post('/api/shows/paginate', values).then(response => {
            setShowsPag(response.data)
        }).catch(error => {
            dispatch(errorDispatcher(error.response.data.message))
        })
    }

    const handleClose = () => {
        setToRemove('');
        setRemoveModal(false)
    }

    const handleModal = (id) => {
        setToRemove(id);
        setRemoveModal(true)
    }

    const handleRemove = () => {
        axios.delete('/api/shows/remove', {
            data: {
                id: toRemove
            }
        }).then(response => {
            getShows({ page: 1, limit })
            dispatch(successDispatcher('Removed !!!'))
            handleClose()
        }).catch(error => {
            dispatch(errorDispatcher(error.response?.data.message))
        })
    }


    return (
        <AdminLayout title="Shows">
            <div className="shows_table">
                <PaginateBlock
                    shows={showsPag}
                    prev={(page) => gotoPage(page)}
                    next={(page) => gotoPage(page)}
                    removeModal={removeModal}
                    handleClose={() => handleClose()}
                    handleModal={(id) => handleModal(id)}
                    handleRemove={() => handleRemove()}
                />
            </div>
        </AdminLayout>
    )
}

export default ShowsAdmin;