import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  IconButton,
  Collapse,
  Badge,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
} from "@mui/material";

//Icons
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";

import {
  fetchCalls,
  unarchiveCall,
  unarchiveAllCalls,
} from "../util/apiFetch.js";
import {
  groupCallsByDate,
  formatTime,
  formatDuration,
} from "../util/handleDate.js";
import DateDivider from "../util/DateBorder.js";
import CallDetail from "./CallInfo.js";

const callTypeIcons = {
  missed: <PhoneMissedIcon style={{ color: "red" }} />,
  answered: <CallIcon style={{ color: "green" }} />,
  voicemail: <VoicemailIcon style={{ color: "yellow" }} />,
};

const ArchivedCalls = () => {
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [unarchivedIds, setUnarchivedIds] = useState(new Set()); // Track unarchived calls using a Set
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchCalls()
      .then((data) => {
        const filteredArchivedCalls = data.filter((call) => call.is_archived);
        setArchivedCalls(filteredArchivedCalls);
      })
      .catch((err) => {
        console.error("Error fetching archived calls:", err);
        setError(err.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleUnarchive = (callId) => {
    setUnarchivedIds(new Set(unarchivedIds).add(callId)); // Add to unarchived set for animation
    unarchiveCall(callId)
      .then(() => {
        setTimeout(() => {
          setArchivedCalls((prevCalls) =>
            prevCalls.filter((call) => call.id !== callId)
          );
          setUnarchivedIds((prevUnarchivedIds) => {
            const newUnarchivedIds = new Set(prevUnarchivedIds);
            newUnarchivedIds.delete(callId);
            return newUnarchivedIds;
          });
        }, 300); // Duration of the animation
      })
      .catch((err) => {
        console.error("Error unarchiving call:", err);
        setError(err.message || "An error occurred");
      });
  };

  const handleUnarchiveAll = () => {
    setLoading(true); // Show loading indicator during the operation
    unarchiveAllCalls(archivedCalls)
      .then(() => {
        setArchivedCalls([]); //Clearing of Set
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error unarchiving all calls:", err);
        setError(err.message || "An error occurred");
        setLoading(false);
      });
  };

  const handleSelectCall = (call) => {
    setSelectedCall(call);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const toggleOptions = (callId) => {
    setExpandedId(expandedId === callId ? null : callId);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <p>Error loading calls: {error}</p>;

  const groupedArchivedCalls = groupCallsByDate(archivedCalls);
  if (groupedArchivedCalls.length === 0) return(
    <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // You can adjust the height as needed
        }}
      >
        <p style={{ textAlign: "center" }}>There are no archived calls</p>
      </div>
  );
  else
    return (
      <div>
        <Button
          sx={{ marginTop: "1rem" }}
          size="large"
          variant="outlined"
          endIcon={<UnarchiveIcon />}
          onClick={() => handleUnarchiveAll()}
        >
          Unarchive All
        </Button>

        <List>
          {groupedArchivedCalls.map((group) => (
            <li key={group.date}>
              <ul>
                <DateDivider date={group.date} />
                {group.calls.map((call) => (
                  <Collapse in={!unarchivedIds.has(call.id)} key={call.id}>
                    <div>
                      <ListItem
                        sx={{
                          border: "1px solid red",
                          borderRadius: "10px",
                          transition:
                            "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",

                          "&:hover, &:focus": {
                            backgroundColor: "#f0f0f0",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                          },
                          margin: "0.3rem",
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "transparent" }}>
                            {callTypeIcons[call.call_type]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Badge
                              badgeContent={call.count > 1 ? call.count : null}
                              color="primary"
                            >
                              <span>{`+${call.from}`}</span>
                            </Badge>
                          }
                          secondary={`Tried to call you on ${
                            call.to
                          } - ${formatDuration(call.duration)}`}
                        />
                        <IconButton onClick={() => toggleOptions(call.id)}>
                          <MoreVertIcon />
                        </IconButton>
                        <div style={{ marginLeft: "auto" }}>
                          <span style={{ fontSize: "0.5rem" }}>
                            {formatTime(call.created_at)}
                          </span>
                        </div>

                        <Collapse
                          in={expandedId === call.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <IconButton
                            edge="end"
                            onClick={() => handleSelectCall(call)}
                          >
                            <InfoIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleUnarchive(call.id)}
                          >
                            <UnarchiveIcon />
                          </IconButton>
                        </Collapse>
                      </ListItem>
                    </div>
                    <Divider variant="middle" />
                  </Collapse>
                ))}
              </ul>
            </li>
          ))}
        </List>
        <CallDetail
          call={selectedCall}
          open={drawerOpen}
          onClose={handleCloseDrawer}
        />
      </div>
    );
};

export default ArchivedCalls;
