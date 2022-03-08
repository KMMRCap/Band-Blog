import dynamic from "next/dynamic";
import AdminLayout from "components/AdminLayout";
import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";

import { errorHelper } from "helpers/functions";

import { useDispatch, useSelector } from "react-redux";
import { errorDispatcher } from 'store/actions/notificationAction';
import { updateUserprofile } from 'store/actions/userAction';
import { Button, TextField } from "@mui/material";

const EmailStepper = dynamic(() => import('components/Admin/EmailStepper'))

const UserProfile = () => {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user.data.firstname,
      lastname: user.data.lastname,
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(2, "2 char min")
        .max(50, "50 char min")
        .required("Sorry the firstname is required"),
      lastname: Yup.string()
        .min(2, "2 char min")
        .max(50, "50 char min")
        .required("Sorry the lastname is required"),
    }),

    onSubmit: (values) => {
      axios.patch('/api/users', values).then(response => {
        dispatch(updateUserprofile(response.data))
      })
        .catch(error => {
          dispatch(errorDispatcher('Sorry try again'))
        })
    },
  });

  return (
    <AdminLayout title="Account">
      <form
        className="mt-3 article_form"
        onSubmit={formik.handleSubmit}
        style={{ maxWidth: "250px" }}
      >
        <div className="form-group my-3">
          <TextField
            style={{ width: "100%" }}
            name="firstname"
            label="Enter your firstname"
            variant="outlined"
            {...formik.getFieldProps("firstname")}
            {...errorHelper(formik, "firstname")}
          />
        </div>
        <div className="form-group my-3">
          <TextField
            style={{ width: "100%" }}
            name="lastname"
            label="Enter your lastname"
            variant="outlined"
            {...formik.getFieldProps("lastname")}
            {...errorHelper(formik, "lastname")}
          />
        </div>
        <Button
          className="mb-3"
          variant="contained"
          color="primary"
          type="submit"
        >
          Edit profile
        </Button>
      </form>
      <EmailStepper />
    </AdminLayout>
  );
};

export default UserProfile;
