import React from 'react';
import { Box, Typography } from '@mui/material';

const DateDivider = ({ date }) => {
    return (
        <Box display="flex" alignItems="center" my={2} px={2}>
            <Box flex={1} mr={1} height="1px" bgcolor="text.secondary" />
            <Typography variant="caption" color="text.secondary">
                {date}
            </Typography>
            <Box flex={1} ml={1} height="1px" bgcolor="text.secondary" />
        </Box>
    );
};

export default DateDivider;