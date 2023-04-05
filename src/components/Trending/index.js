import { Box, Card, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import './index.css'
import "react-multi-carousel/lib/styles.css";
import { Container } from '@mui/system'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const Trending = () => {
    return (
        <>
            <Box className='trending' >
                <Container maxWidth="xl">
                    <Carousel autoPlay={true} removeArrowOnDeviceType="mobile" responsive={responsive}>
                         <Stack>
                            <Card>
                                <Typography>sdsdfsdf</Typography>
                            </Card>
                            <Card>
                                <Typography>sdsdfsdf</Typography>
                            </Card>
                         </Stack>
                         <Stack>
                            <Card>
                                <Typography>sdsdfsdf</Typography>
                            </Card>
                            <Card>
                                <Typography>sdsdfsdf</Typography>
                            </Card>
                         </Stack>
                         <Stack>
                            <Card>
                                <Typography>sdsdfsdf</Typography>
                            </Card>
                            <Card>
                                <Typography>sdsdfsdf</Typography>
                            </Card>
                         </Stack>
                         <Stack>
                            <Card>
                                <Typography>sdsdfsdf</Typography>
                            </Card>
                            <Card>
                                <Typography>sdsdfsdf</Typography>
                            </Card>
                         </Stack>
                         <Stack>
                            <Card>
                                <Typography>sdsdfsdf</Typography>
                            </Card>
                            <Card>
                                <Typography>sdsdfsdf</Typography>
                            </Card>
                         </Stack>
                    </Carousel>
                </Container>
            </Box>
        </>
    )
}

export default Trending