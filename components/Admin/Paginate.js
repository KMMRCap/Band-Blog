import { Table, Pagination, Modal, Button } from 'react-bootstrap';
import { useRouter } from 'next/router'
import React from 'react';


const PaginateBlock = (props) => {

    const { shows, prev, next, removeModal, handleClose, handleModal, handleRemove } = props

    const router = useRouter();

    return (
        <>
            {shows.docs.length ?
                <Table striped bordered hover>

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Venue</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shows.docs.map((show) => (
                            <tr key={show._id}>
                                <td>{show.title}</td>
                                <td>{show.venue}</td>
                                <td>{show.date}</td>
                                <td
                                    className="action_btn remove_btn"
                                    onClick={() => handleModal(show._id)}
                                >Remove</td>
                                <td
                                    className="action_btn edit_btn"
                                    onClick={() => router.push(`/users/dashboard/shows/${show.slug}`)}
                                >Edit</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
                :
                <div className='mt-5 mx-4'>Nothing to show</div>
            }
            {shows.docs.length ?
                <Pagination>
                    {shows.hasPrevPage ? (
                        <>
                            <Pagination.Prev onClick={() => prev(shows.prevPage)} />
                            <Pagination.Item onClick={() => prev(shows.prevPage)}>
                                {shows.prevPage}
                            </Pagination.Item>
                        </>
                    ) : null}

                    <Pagination.Item active>{shows.page}</Pagination.Item>

                    {shows.hasNextPage ? (
                        <>
                            <Pagination.Item onClick={() => next(shows.nextPage)}>
                                {shows.nextPage}
                            </Pagination.Item>
                            <Pagination.Next onClick={() => next(shows.nextPage)} />
                        </>
                    ) : null}
                </Pagination>
                :
                null
            }
            <Modal show={removeModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you really sure ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    There is no going back
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleClose}
                    >
                        Opps, close this now !!
                    </Button>
                    <Button variant="danger"
                        onClick={handleRemove}
                    >
                        Delete it
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default PaginateBlock;