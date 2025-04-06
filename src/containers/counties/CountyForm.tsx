import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { Form as FormikForm, Formik, FormikErrors } from "formik";
import * as Yup from "yup";
import { Close } from "@mui/icons-material";

interface RoleFormValues {
  code: string;
  name: string;
  description: string;
}
interface AddRolesModalProps {
  handleClose: () => void;
  item?: any;
}

const StyledButton = styled(Button)(() => ({
  borderRadius: "16px",
  textTransform: "none",
  fontSize: "inherit",
  padding: "10px",
  minWidth: "200px",
}));

const userSchema = Yup.object().shape({
  code: Yup.string().required("Please enter code"),
  name: Yup.string().required("Please enter name"),
  description: Yup.string().required("Please enter your description"),
});

const disableButton = (
  values: RoleFormValues,
  errors: FormikErrors<RoleFormValues>
) => {
  return !(
    values.code &&
    values.name &&
    values.description &&
    !errors.code &&
    !errors.name &&
    !errors.description
  );
};

function CountyForm({ handleClose, item }: AddRolesModalProps) {
  return (
    <Box sx={{ justifyContent: "center", padding: "10px -10px" }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h3" lineHeight={3}>
          {item ? "Update a County" : "Add a County"}
        </Typography>
        <IconButton
          onClick={handleClose}
          disableFocusRipple
          disableRipple
          disableTouchRipple
        >
          <Tooltip title="Close">
            <Close color="error" />
          </Tooltip>
        </IconButton>
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
            code: item?.code || "",
            name: item?.name || "",
            description: item?.description || "",
          }}
          validationSchema={userSchema}
          //   onSubmit={(values) => {
          //     console.log(values);
          //   }}

          onSubmit={async (values, { resetForm }) => {
            // setLoading(true);
            // setErrorMessage("");

            try {
              const response = await fetch("/api/counties", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });

              if (!response.ok) throw new Error("Failed to create item");

              const data = await response.json();
              console.log("Item created:", data);
              resetForm(); // Clear form after successful submission
            } catch (error) {
              //   setErrorMessage(error.message);
              console.error("Error creating item:", error);
            } finally {
              //   setLoading(false);
            }
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
              <Grid item xs={12}>
                  <TextField
                    id="code"
                    name="code"
                    label="County Code *"
                    fullWidth
                    helperText={errors.code || ""}
                    value={values.code}
                    error={!!errors.code && touched.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    label="County Name *"
                    fullWidth
                    helperText={errors.name || ""}
                    value={values.name}
                    error={!!errors.name && touched.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="Description *"
                    multiline
                    rows={4}
                    fullWidth
                    helperText={errors.description || ""}
                    value={values.description}
                    error={!!errors.description && touched.description}
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
                  {item ? "Update County" : "Create County"}
                </StyledButton>
              </Box>
            </FormikForm>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default CountyForm;
