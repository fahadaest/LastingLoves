import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar, IconButton, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const SnackbarWrapper = styled("div")`
  position: relative;
  z-index: 2000;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%; /* Start with 0% width */
    height: 8px;
    background-color: ${(props) => props.bgColor || "#01E17B"};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    animation: grow ${(props) => props.duration}ms linear forwards;
  }

  @keyframes grow {
    from {
      width: 0%; /* Start from the left */
    }
    to {
      width: 100%; /* Expand to the right */
    }
  }
`;

const SnackbarContainer = styled("div")`
  margin-right: 20px;
  z-index: 2000;
`;

const CustomAlert = ({ message, severity, duration, setShowAlert }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(true);

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                setSnackbarOpen(false);
                if (setShowAlert) {
                    setShowAlert(false);
                }
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, setShowAlert]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        if (setShowAlert) {
            setShowAlert(false);
        }
    };

    if (!snackbarOpen) return null;

    let bgColor;
    let severityType;

    switch (severity) {
        case "success":
            bgColor = "#4caf50";
            severityType = "success";
            break;
        case "warning":
            bgColor = "#ff9800";
            severityType = "warning";
            break;
        case "error":
            bgColor = "#f44336";
            severityType = "error";
            break;
        default:
            bgColor = "#4caf50";
            severityType = "success";
    }

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={duration}
            onClose={handleCloseSnackbar}
            TransitionComponent={Fade}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            sx={{
                zIndex: 2000,
            }}
        >
            <SnackbarContainer>
                <SnackbarWrapper bgColor={bgColor} duration={duration}>
                    <Alert
                        severity={severityType}
                        action={
                            <React.Fragment>
                                <IconButton
                                    size="small"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={handleCloseSnackbar}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    >
                        <span style={{ fontSize: "14px" }}>
                            {message}
                        </span>
                    </Alert>
                </SnackbarWrapper>
            </SnackbarContainer>
        </Snackbar>
    );
};

CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(["success", "warning", "error"]).isRequired,
    duration: PropTypes.number,
    setShowAlert: PropTypes.func,
};

CustomAlert.defaultProps = {
    duration: null,
    setShowAlert: () => { },
};

export default CustomAlert;
