import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { UserData } from "./UserData";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <section>{children}</section>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ photoData }) {
  const [value, setValue] = React.useState(0);
  const { favorites } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Photos" {...a11yProps(0)} />
          <Tab label="Favorites" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserData photoData={photoData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <section className="user-photos-list">
          <ul className="userPageTabs">
            {favorites?.map((photo) => (
              <li
                key={photo.photoID}
                onClick={() => navigate(`/photos/${photo.photoID}`)}
              >
                <img
                  src={`${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
                    photo.photoName
                  }`}
                  alt={photo.description}
                />
              </li>
            ))}
          </ul>
        </section>
      </TabPanel>
    </Box>
  );
}
