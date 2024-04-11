import React from 'react'
import {  Box, Typography } from '@mui/material';
function ModalContent() {
    return (
        <div>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1, m: 1, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h5" component="h2">
                    This is the modal content
                </Typography>
              
            </Box>

        </div>
    )
}

export default ModalContent
