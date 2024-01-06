import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import NumberPad from "./KeyPad";

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{
      width: "100%",
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Call"
          icon={<LocalPhoneOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<Person2OutlinedIcon />}
        />
        <BottomNavigationAction
          label="Numpad"
          onClick={NumberPad}
          icon={<KeyboardAltOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Status"
          icon={<CircleNotificationsOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
