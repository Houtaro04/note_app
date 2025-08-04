import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { createClient } from "graphql-ws";
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from "../utils/constant.js";
import { useEffect } from "react";
import { Badge } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";

const client = createClient({
    url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const query = `subscription PushNotification {
  notification {
    message
  }
}`

export default function PushNotification() {
    const [invisible, setInvisible] = useState(true);
    const [notifications, setNotifications] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    
         const open = Boolean(anchorEl);
        // console.log({user})
    
        const handleClose = () => {
            setAnchorEl(null);
            setNotifications('');
            setInvisible(true);
        };
    
        const handleClick = (e) => {
            if(notifications){
                setAnchorEl(e.currentTarget)
            }
        };

    useEffect(() => {
        const onNext = (data) => {
            setInvisible(false);
            const message = data?.data?.notification?.message;
            setNotifications(message);
            console.log('[PUSH_NOTIFICATION]', data);
        };

        const dispose = client.subscribe(
            { query },
            {
                next: onNext,
                error: (err) => console.error('[PUSH_NOTIFICATION_ERROR]', err),
                complete: () => console.log('[PUSH_NOTIFICATION_COMPLETE]'),
            }
        );

        // Dọn dẹp khi unmount
        return () => {
            if (typeof dispose === 'function') {
                dispose(); // chính là unsubscribe
            }
        };
    }, []);

    return (
    <>
        <Badge color="secondary" variant="dot" invisible={invisible}>
            <NotificationsIcon onClick={handleClick} />
        </Badge>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>{notifications}</MenuItem>
        </Menu>
    </>
    );
}