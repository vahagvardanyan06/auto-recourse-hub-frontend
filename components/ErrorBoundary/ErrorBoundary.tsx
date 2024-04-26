import React, { useCallback } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ErrorBoundary = () => {
  const { push } = useRouter();

  const handleNavigateButtonClick = useCallback(() => {
    push("/");
  }, [push]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flex flex-col">
        <Typography variant="h4" gutterBottom align="center">
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" align="center">
          We're sorry, but it looks like there was an error processing your
          request.
        </Typography>
        <Button
          onClick={handleNavigateButtonClick}
          variant="outlined"
          className="w-full"
          color="primary"
          sx={{ mt: 2 }}
        >
          Go to Home Page
        </Button>
      </div>
    </Container>
  );
};

export default ErrorBoundary;
