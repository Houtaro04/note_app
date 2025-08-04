import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UserMenu from '../../components/UserMenu';
import FolderList from '../../components/FolderList';
import { Outlet, useLoaderData } from 'react-router-dom';
import PushNotification from '../../components/PushNotification';

export default function Home() {
  const { folders } = useLoaderData();
  
  return (
    <>
        <Typography variant='h4' sx={{ mb: '20px' }}>
            Note App
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'right', mb: '10px' }}>
             <UserMenu />
             <PushNotification />
        </Box>

        <Grid container sx={{height: '50vh', boxShadow: '0 0 15px 0 rgb(193 193 193 / 60%)' }}>
                {/* Folder List */}
                <Grid item xs={3} sx={{height: '100%',width: '30%' ,}}>
                    <FolderList folders={folders}/>
                </Grid>

                {/* Note List */}
                <Grid item xs={9} sx={{height: '100%',width: '70%' ,}}>
                    <Outlet />
                </Grid>
        </Grid>
    </>
  );
}