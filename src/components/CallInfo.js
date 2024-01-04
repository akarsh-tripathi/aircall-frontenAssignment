// CallDetail.jsx

import React from 'react';
import { Drawer, IconButton, Box, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call'; // For the call number
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // For the date
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // For time and duration
import { formatDuration, formatTime, formatDate } from '../dateUtils'; // Import utility functions

const CallDetail = ({ call, open, onClose }) => {
    if (!call) return null;

    const startTime = new Date(call.created_at);
    const endTime = new Date(startTime.getTime() + call.duration * 1000);

    return (
        <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: '100%' } }}>
            <Box sx={{ width: '100%', padding: 2, marginTop: "4rem" }}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 75 }}>
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Call Details</Typography>

                <Divider />

                <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                    <CallIcon color="primary" />
                    <Typography variant="subtitle1" ml={1}>Number: {call.from}</Typography>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                    <CalendarTodayIcon color="primary" />
                    <Typography variant="subtitle1" ml={1}>Date: {formatDate(call.created_at)}</Typography>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                    <AccessTimeIcon color="primary" />
                    <Typography variant="subtitle1" ml={1}>Time: {formatTime(call.created_at)}</Typography>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                    <AccessTimeIcon color="primary" />
                    <Typography variant="subtitle1" ml={1}>Duration: {formatDuration(call.duration)}</Typography>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                    <AccessTimeIcon color="primary" />
                    <Typography variant="subtitle1" ml={1}>Started at: {formatTime(startTime)}</Typography>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                    <AccessTimeIcon color="primary" />
                    <Typography variant="subtitle1" ml={1}>Ended at: {formatTime(endTime)}</Typography>
                </Box>
            </Box>
        </Drawer>
    );
};

export default CallDetail;
