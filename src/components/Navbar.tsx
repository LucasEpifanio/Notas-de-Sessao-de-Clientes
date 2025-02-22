import styled from "styled-components";
import { Tabs, Tab, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const StyledPaper = styled(Paper)`
  position: sticky;
  top: 20px;
  margin: 0 auto;
  border-radius: 8px!important;
  padding: 5px 10px;
  width: 26rem;


  @media (max-width: 500px) {
    width: 20rem; 
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabIndex = () => {
    switch (location.pathname) {
      case "/": return 0;
      case "/clients": return 1;
      case "/add-client": return 2;
      default: return false;
    }
  };

  const [value, setValue] = useState(getTabIndex());

  useEffect(() => {
    setValue(getTabIndex());
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const paths = ["/", "/clients", "/add-client"];
    navigate(paths[newValue]);
  };

  return (
    <StyledPaper elevation={3}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="nav tabs"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          "& .MuiTab-root:focus": { outline: "none" },
          "& .MuiTab-root:focusVisible": { outline: "none" },
        }}
      >
        <Tab label="Home" sx={{ padding: "5px 10px" }} />
        <Tab label="Clientes" sx={{ padding: "5px 10px" }} />
        <Tab label="Add Cliente" sx={{ padding: "5px 10px" }} />
      </Tabs>
    </StyledPaper>
  );
};

export default Navbar;
