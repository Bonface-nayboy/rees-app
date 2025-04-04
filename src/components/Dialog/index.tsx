import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import Slide, { SlideProps } from "@mui/material/Slide";
// import { Form as FormikForm } from "formik";
import { Typography } from "@mui/material";

const StyledAppBar = styled(AppBar)(
  () => `
  position: relative;
  background-color: "#fff;
  padding: 16px 24px;
  boxShadow: 0 0 1px 0 rgba(0,0,0,0.16);
`
);

const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface ModalChildrenProps {
  modalHeader?: React.ReactNode;
  modalContent: React.ReactNode;
  modalActions?: React.ReactNode;
}
function ModalChildren({
  modalHeader,
  modalContent,
  modalActions,
}: ModalChildrenProps) {
  return (
    <>
      {modalHeader && (
        <StyledAppBar>
          <Typography
            variant="h4"
            sx={(theme) => ({
              fontSize: 16,
              color: theme.palette.primary.main,
            })}
          >
            {modalHeader}
          </Typography>
        </StyledAppBar>
      )}

      <DialogContent>{modalContent}</DialogContent>
      {modalActions && (
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {modalActions}
        </DialogActions>
      )}
    </>
  );
}

interface ModalProps {
  open: boolean;
  responsive?: boolean;
  fullScreen?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  modalHeader?: React.ReactNode;
  modalContent: React.ReactNode;
  modalActions?: React.ReactNode;
  form?: boolean;
  handleClose: () => void;
  disableBackdropClose?: boolean;
}
function Modal({
  open,
  responsive = false,
  fullScreen = false,
  maxWidth = "sm",
  fullWidth = false,
  modalHeader = null,
  modalContent,
  modalActions = null,
  form = false,
  handleClose,
  disableBackdropClose = false,
}: ModalProps) {
  const theme = useTheme();
  const fullScreenValue = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen={responsive ? fullScreenValue : fullScreen}
      open={open}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={() => {
        // if disableBackdropClose is passed then dont close on clicking the backdrop
        if (!disableBackdropClose) {
          handleClose();
        }
      }}
      aria-labelledby="responsive-dialog-title"
    >
      <Box
        sx={{
          paddingBottom: 1,
        }}
      >
        <ModalChildren
          modalHeader={modalHeader}
          modalContent={modalContent}
          modalActions={modalActions}
        />
      </Box>
    </Dialog>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalContent: PropTypes.element.isRequired,
};

export default Modal;
