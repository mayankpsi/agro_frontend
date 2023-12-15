import { Box, Stack } from "@mui/material";
import ShowForm from "./ShowForm";
import { LoginBg } from "../../Images";
import useAuthContext from "../../hooks/useAuthContext";
// import {SnackbarAlert} from "../../ComponentsV2";

const AuthPage = () => {
  const { handleUserLoginChange, handleUserLoginSubmit, onUserLogin } =
    useAuthContext();

  return (
    <>
      {/* <SnackbarAlert
        open={snackbarAlert?.open}
        closeAlert={onSnackbarAlertClose}
        message={snackbarAlert?.message}
        type={snackbarAlert?.type}
      /> */}
      <Stack
        width="100%"
        height="100vh"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{
          backgroundImage: `url(${LoginBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box className="card" sx={{ minWidth: 352, mr: "20%" }}>
          <Box>
            <ShowForm
              value={onUserLogin}
              onChange={handleUserLoginChange}
              onSubmit={handleUserLoginSubmit}
            />
          </Box>
          {/* <Box>
            <ShowForm />
          </Box> */}
        </Box>
      </Stack>
    </>
  );
};

export default AuthPage;
