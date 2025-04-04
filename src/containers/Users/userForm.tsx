import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Form as FormikForm, Formik, FormikErrors } from "formik";
import * as Yup from "yup";
import { useParams, useSearchParams } from "next/navigation";

interface RoleFormValues {
  firstName: string;
  lastName: string;
  email: string;
  msisdn: number;
}
interface AddRolesModalProps {
  handleClose: () => void;
  item?: any;
}

const StyledButton = styled(Button)(() => ({
  borderRadius: "80px",
  border: "1.5px solid #35A839",
  textTransform: "none",
  fontSize: "inherit",
  padding: "4px 40px",
}));

const userSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter First Name"),
  lastName: Yup.string().required("Please enter Last Name"),
  email: Yup.string().required("Please enter email address"),
  msisdn: Yup.string().required("Please enter phone number"),
});

const disableButton = (
  values: RoleFormValues,
  errors: FormikErrors<RoleFormValues>
) => {
  return !(
    values.firstName &&
    values.lastName &&
    values.email &&
    values.msisdn &&
    !errors.lastName &&
    !errors.msisdn
  );
};

function UserForm({ handleClose, item }: AddRolesModalProps) {
  return (
    <Box sx={{ justifyContent: "center", padding: "10px -10px" }}>
      <Box display="flex" justifyContent="flex-start" marginBottom="10px">
        <Typography variant="h3">
          {item ? "Update User" : "Add User"}
        </Typography>
      </Box>
      <Box margin="0px -20px" height={10}>
        <Divider />
      </Box>
      <Box
        sx={{
          padding: "0px 50px",
        }}
      >
        <Formik<RoleFormValues>
          initialValues={{
            firstName: item?.firstName || "",
            lastName: item?.lastName || "",
            email: item?.email || "",
            msisdn: item?.msisdn || "",
          }}
          validationSchema={userSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            errors,
            values,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <FormikForm autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="firstName *"
                    fullWidth
                    helperText={errors.firstName || ""}
                    value={values.firstName}
                    error={!!errors.firstName && touched.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name *"
                    fullWidth
                    helperText={errors.lastName || ""}
                    value={values.lastName}
                    error={!!errors.lastName && touched.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email Address *"
                    fullWidth
                    helperText={errors.email || ""}
                    value={values.email}
                    error={!!errors.email && touched.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <TextField
                    id="msisdn"
                    name="msisdn"
                    label="Phone Number *"
                    type="mobile"
                    fullWidth
                    helperText={errors.msisdn || ""}
                    value={values.msisdn}
                    error={!!errors.msisdn && touched.msisdn}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Box margin="10px -70px" height={10}>
                <Divider />
              </Box>
              <Box display="flex" justifyContent="flex-end" mx={3}>
                <StyledButton
                  variant="outlined"
                  onClick={handleClose}
                  sx={{ marginRight: 2 }}
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  variant="contained"
                  type="submit"
                  disabled={disableButton(values, errors)}
                >
                  {item ? "Update User" : "Add User"}
                </StyledButton>
              </Box>
            </FormikForm>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default UserForm;
