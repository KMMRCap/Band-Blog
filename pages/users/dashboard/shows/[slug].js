import { useRef, useState } from "react";
import AdminLayout from "components/AdminLayout";
import { useFormik } from "formik";
import { errorHelper } from "helpers/functions";
import { showValidation } from "helpers/validations";
import UploadHandler from 'components/Admin/UploadImage';
import { useDispatch } from "react-redux";
import { successDispatcher, errorDispatcher, } from "store/actions/notificationAction";
import axios from "axios";
////////// EDIT ///////
import { useRouter } from 'next/router'
import connectToDb from 'database/db';
import { getBySlug } from 'database/services/showService';
import { toJson } from 'helpers/functions'
import { Button, CircularProgress, Divider, TextField } from "@mui/material";
////////// END EDIT ///////


export const getServerSideProps = async (context) => {
    await connectToDb();
    const show = await getBySlug(context.params)
    if (!show) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            show: toJson(show[0])
        }
    }
}


const CreatShowPage = ({ show }) => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const clearRef = useRef();

    const formik = useFormik({
        ////////// EDIT ///////
        enableReinitialize: true,
        initialValues: {
            slug: show.slug,
            title: show.title,
            venue: show.venue,
            excerpt: show.excerpt,
            content: show.content,
            yt: show.yt,
            image: show.image,
            date: show.date,
            time: show.time,
        },
        ////////// END EDIT ///////
        validationSchema: showValidation,
        onSubmit: (values) => {
            setLoading(true)
            axios.patch("/api/shows/edit", {
                data: values,
                current: show.slug
            })
                .then(response => {
                    if (response.data.slug !== router.query.slug) {
                        router.push(`/users/dashboard/shows/${response.data.slug}`)
                    }
                    dispatch(successDispatcher('Edited !!'))
                })
                .catch(error => dispatch(errorDispatcher(error.response.data.message)))
                .finally(() => setLoading(false))
        },
    });

    return (
        <AdminLayout title="Edit Show">
            <form className="event_form" onSubmit={formik.handleSubmit} >

                {/* ////////// EDIT /////// */}
                <UploadHandler
                    picValue={(url) => formik.setFieldValue("image", url)}
                    ref={clearRef}
                    prevImage={show.image}
                />
                {/* ////////// END EDIT /////// */}
                <Divider className="my-3" />
                <div className="form-group my-4">
                    <TextField
                        style={{ width: "100%" }}
                        name="title"
                        label="Enter a title"
                        variant="outlined"
                        {...formik.getFieldProps("title")}
                        {...errorHelper(formik, "title")}
                    />
                </div>
                <div className="form-group my-4">
                    <TextField
                        style={{ width: "100%" }}
                        name="venue"
                        label="Enter the venue name"
                        variant="outlined"
                        {...formik.getFieldProps("venue")}
                        {...errorHelper(formik, "venue")}
                    />
                </div>
                <div className="form-group my-4">
                    <TextField
                        name="excerpt"
                        label="Enter a brief description"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...formik.getFieldProps("excerpt")}
                        {...errorHelper(formik, "excerpt")}
                    />
                </div>
                <div className="form-group my-4">
                    <TextField
                        name="content"
                        label="Enter a content"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...formik.getFieldProps("content")}
                        {...errorHelper(formik, "content")}
                    />
                </div>
                <Divider className="mt-3 mb-3" />
                <div className="form-group my-4">
                    <TextField
                        className="date-time-field mr-3"
                        name="excerpt"
                        label="Date of the event"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...formik.getFieldProps("date")}
                        {...errorHelper(formik, "date")}
                    />
                    <TextField
                        className="date-time-field"
                        name="time"
                        label="Start time"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ steps: 300 }}
                        {...formik.getFieldProps("time")}
                        {...errorHelper(formik, "time")}
                    />
                </div>
                <Divider className="mt-3 mb-3" />
                <div className="form-group my-4">
                    <TextField
                        style={{ width: "100%" }}
                        name="yt"
                        label="Enter the yt link "
                        variant="outlined"
                        {...formik.getFieldProps("yt")}
                        {...errorHelper(formik, "yt")}
                    />
                </div>
                <Divider className="mt-3 mb-3" />
                <div className="form-group my-4">
                    <TextField
                        style={{ width: "100%" }}
                        name="slug"
                        label="Enter the slug "
                        variant="outlined"
                        {...formik.getFieldProps("slug")}
                        {...errorHelper(formik, "slug")}
                    />
                </div>
                {loading ?
                    <CircularProgress color="secondary" className="mt-3" />
                    :
                    <Button variant="contained" color="primary" type="submit">
                        Edit Show
                    </Button>
                }
            </form>
        </AdminLayout>
    );
};


export default CreatShowPage;
