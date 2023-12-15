import { Stack, Box, Paper, Container } from "@mui/material";
import { Logo } from "../Images";
import { NotificationsDropdown, ProfileMenu, HeaderTabs } from "../components";

const Header = ({ headerTabsData }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "7vh",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box
          component="img"
          sx={{
            objectFit: "cover",
            borderRadius: "10px",
            ml: -4,
          }}
          src={Logo}
          alt="livestock-monitoring-logo"
        />
        <HeaderTabs data={headerTabsData} />
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <NotificationsDropdown />
          <ProfileMenu />
        </Stack>
      </Container>
    </Paper>
  );
};

export default Header;
