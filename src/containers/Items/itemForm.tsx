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
  code: string;
  name: string;
  category: string;
  bPrice: number;
  sPrice: number;
  description: string;
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
  code: Yup.string().required("Please enter code"),
  name: Yup.string().required("Please enter name"),
  category: Yup.string().required("Please enter category"),
  bPrice: Yup.string().required("Please enter buy price"),
  sPrice: Yup.string().required("Please enter sale price"),
  description: Yup.string().required("Please enter your description"),
});

const disableButton = (
  values: RoleFormValues,
  errors: FormikErrors<RoleFormValues>
) => {
  return !(
    values.code &&
    values.name &&
    values.category &&
    values.description &&
    !errors.name &&
    !errors.description
  );
};

function ItemForm({ handleClose, item }: AddRolesModalProps) {
  return (
    <Box sx={{ justifyContent: "center", padding: "10px -10px" }}>
      <Box display="flex" justifyContent="flex-start" marginBottom="10px">
        <Typography variant="h3">
          {item ? "Edit a Item" : "Create a Item"}
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
            code: item?.name || "",
            name: item?.name || "",
            category: item?.name || "",
            bPrice: item?.name || 0,
            sPrice: item?.name || 0,
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
              const response = await fetch("/api/items", {
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
                <Grid item xs={12} md={6}>
                  <TextField
                    id="code"
                    name="code"
                    label="Code *"
                    fullWidth
                    helperText={errors.code || ""}
                    value={values.code}
                    error={!!errors.code && touched.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="name"
                    name="name"
                    label="Name *"
                    fullWidth
                    helperText={errors.name || ""}
                    value={values.name}
                    error={!!errors.name && touched.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="category"
                    name="category"
                    label="Category *"
                    select
                    fullWidth
                    helperText={errors.category || ""}
                    value={values.category}
                    error={!!errors.category && touched.category}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="drinks">Drinks</MenuItem>
                    <MenuItem value="detergent">Detergents</MenuItem>
                    <MenuItem value="food">Food and Beaverage</MenuItem>
                    <MenuItem value="fruit">Fruits</MenuItem>
                    <MenuItem value="utensils">Utensils</MenuItem>
                  </TextField>
                </Grid>{" "}
                <Grid item xs={12} md={6}>
                  <TextField
                    id="description"
                    name="description"
                    label="Description *"
                    fullWidth
                    helperText={errors.description || ""}
                    value={values.description}
                    error={!!errors.description && touched.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="bPrice"
                    name="bPrice"
                    label="Buy Price *"
                    type="number"
                    fullWidth
                    helperText={errors.bPrice || ""}
                    value={values.bPrice}
                    error={!!errors.bPrice && touched.bPrice}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="sPrice"
                    name="sPrice"
                    label="Sale Price *"
                    type="number"
                    fullWidth
                    helperText={errors.sPrice || ""}
                    value={values.sPrice}
                    error={!!errors.sPrice && touched.sPrice}
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
                  {item ? "Update Item" : "Create Item"}
                </StyledButton>
              </Box>
            </FormikForm>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default ItemForm;
