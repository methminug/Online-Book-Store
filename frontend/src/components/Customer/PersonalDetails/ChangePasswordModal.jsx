import React, { useState } from "react";
import {
  Grid,
  TextField,
  Modal,
  Backdrop,
  Fade,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import styles from "./Personaldetails.module.scss";
import { questionIcon } from "../../../assets/images";

const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: "center",
    justifyContent: "center",
    width: "53%",
    display: "block",
    margin: "60px auto",
  },
  paper: {
    backgroundColor: "#f9f9f9",
    outline: "none",
    borderRadius: "15px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ChangePasswordModal = () => {
  const [password, setPassword] = useState({
    current: "",
    new: "",
    newRenter: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFieldChange = (e) => {
    setPassword((current) => {
      return {
        ...current,
        [e.target.id]: e.target.value,
      };
    });
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPassword({
      current: "",
      new: "",
      newRenter: "",
    });
    setOpen(false);
  };

  const handleSubmit = () => {
    setSuccess("");
    setError("");
    if (
      password.current === "" ||
      password.new === "" ||
      password.newRenter === ""
    ) {
      setError("Please enter all required fields.");
      setTimeout(() => setError(""), 4000);
    } else if (password.new !== password.newRenter) {
      setError("The new passwords do not match.");
      setTimeout(() => setError(""), 4000);
    } else {
      //POST

      //Check for errors in mismatching current password

      //if All good set success
      setSuccess("Password updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  return (
    <React.Fragment>
      <Button className={styles.signInBtn} onClick={handleOpen}>
        CHANGE PASSWORD
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container direction="row">
              <img
                src={questionIcon}
                style={{ marginRight: "20px", height: "100px", width: "100px" }}
              />
              <div style={{ marginTop: "30px" }}>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ paddingBottom: "10px" }}
                >
                  Changing your password
                </Typography>
                <div>
                  <Typography className={styles.descText}>
                    Please enter your previous password and a new password to
                    continue.
                  </Typography>
                  <Grid item container style={{ width: "250px" }}>
                    <TextField
                      className={styles.modalTextField}
                      id="current"
                      type="password"
                      label="Current password"
                      value={password.current}
                      onChange={handleFieldChange}
                      variant="outlined"
                    />
                    <TextField
                      className={styles.modalTextField}
                      id="new"
                      type="password"
                      label="New password"
                      value={password.new}
                      onChange={handleFieldChange}
                      variant="outlined"
                    />
                    <TextField
                      className={styles.modalTextField}
                      id="newRenter"
                      type="password"
                      label="Re-enter new password"
                      value={password.newRenter}
                      onChange={handleFieldChange}
                      variant="outlined"
                    />
                  </Grid>
                  <div style={{ marginTop: "10px" }}>
                    {success ? (
                      <Alert severity="success">{success}</Alert>
                    ) : null}
                    {error ? <Alert severity="warning">{error}</Alert> : null}
                  </div>
                  <Button
                    className={styles.signInBtn}
                    style={{ marginTop: "15px" }}
                    onClick={handleSubmit}
                  >
                    Change Password
                  </Button>
                  <Button
                    className={styles.cancel}
                    style={{ marginTop: "15px" }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default ChangePasswordModal;