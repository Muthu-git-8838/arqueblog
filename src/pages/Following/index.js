import React, { useEffect, useState } from 'react';
// import Header from '../../components/header/Header';
//import Breadcrumb from '../../components/myAds/myAds';
// import Box from '@mui/material/Box';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
// import './index.css'ss;

import { Skeleton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../services/auth';
import Header from '../../components/Header';


const useStyles = makeStyles({
    addButtonStyle: {
        textTransform: 'capitalize !important',
        borderColor: '#c1c1c1 !important',
        color: 'black !important',
        fontWeight: '700 !important'
    },
    imgStyle: {
        display: 'flex',
        justifyContent: 'center'
    },
    textFont: {
        fontSize: '10px !important',
        marginTop: '3px !important',
        opacity: '0.7'
    },
    textAmt: {
        fontSize: '16px !important',
        marginTop: '3px !important',
        fontWeight: '900 !important'
    },
    viewText: {
        fontSize: '14px !important',
    },
    dateText: {
        fontSize: '14px !important',
        marginTop: '7px !important'
    },
    productName: {
        fontSize: '14px !important',
        marginTop: '3px !important',
        color: '#d10882',
        fontWeight: '900 !important'
    },
    addPreview: {
        fontSize: '14px !important',
        marginTop: '3px !important',
        color: '#1d608a',
        fontWeight: '900 !important',
        textDecoration: 'underline',
        textAlign: 'end',
        fontWeight: '100',
        textDecorationColor: '#b3cbda'
    },
    heartIconColor: {
        background: '#1d608a'
    },
    adsName: {
        fontSize: '14px !important',
        marginTop: '3px !important',
        color: 'white',
        fontWeight: '900 !important'
    },
    adsFont: {
        fontSize: '10px !important',
        marginTop: '3px !important',
        color: 'white'
    },
    buttonStyle: {
        position: 'absolute !important',
        top: '2em',
        right: '15em'

    },
    loginBtn: {
        position: 'absolute !important',
        right: '18em',
        top: '2em'
    },
    cardAlign: {
        borderRadius: '20px !important'
    },
    heartIconColor: {
        background: '#1d608a !important'
    },
    cardTxt: {
        paddingBottom: '1em',
        paddingLeft: '1em',
    },
    iconStyle: {
        fontSize: '20px !important',
        opacity: '0.9'

    },
    loginBtn: {
        position: 'absolute !important',
        right: '10em',
        top: '4em'
    }
});


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#d10882'),
    backgroundColor: '#d10882',
    '&:hover': {
        backgroundColor: '#d10882',
    },
}));

export default function Following(...props) {
    const classes=useStyles()
    const navigate=useNavigate()
    const [locations, setLocations] = useState([])

const getAllServices = async () => {
    const response = await apiRequest({
        url: 'api/services',
        method: 'POST',
        data: {}
    })
    console.log("s-s-s>>>>>>>>>>>>>>>>>", response)
    if (response.success) {
        if (response.data && response.data.length > 0) {
            let locations = response.data.reduce((acc, cv) => {
                if (cv.serviceLocation) {
                    acc.push({
                        pos: {
                            lat: Number(cv.serviceLocation.latitude),
                            lng: Number(cv.serviceLocation.longitude)
                        },
                        id: cv.service_location_id || cv.service_id
                    })
                }
                return acc;
            }, [])
            setLocations(locations)
        }

    }
}

useEffect(() => {
    // getAllServices();
}, [])

    return (
        <>
           <Header/>
            <Grid container height={'100%'}
                alignItems="center"
                spacing={0}
                pl={2}
                pr={2}
                direction={{ xs: 'column', sm: 'column', md: 'row', }}
            >
            
                <Grid item xs={12} p={4}>
                <Card sx={{ height: '60vh', display:'flex' }}>
                  
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Stack spacing={2} justifyContent='center'>
                            <Typography textAlign="center">You don't have any followings!</Typography>
                            <Box sx={{ width: 300 }}>
                                <Skeleton />
                                <Skeleton animation="wave" />
                                <Skeleton animation={false} />
                            </Box>
                        </Stack>
                    </Box>
                    </Card>
                </Grid>
                
            </Grid>
          
        </>
    )
}