import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/routes";
import logo from "./assets/logo.png";

const App = () => {
  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: "25px",
          left: "20px",
          zIndex: 1000,
          display: { xs: "none", md: "block" },
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "28px" }} />
      </Box>

      <Navbar />

      <Box
        component="main"
        sx={{
          mt: "50px",
          minHeight: "calc(80vh - 100px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <AppRoutes />
        </Container>
      </Box>
    </Box>
  );
};

export default App;
