import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import watch from '../../assets/watch1.jpg'
import watch1 from '../../assets/watch2.jpg'
import game from '../../assets/game.jpg'
import game1 from '../../assets/game1.jpg'
import './index.css'

const Tech = () => {
    return (
        <>
            <Box className='trending' >
                <Stack>
                    <Stack sx={{
                    }}>
                        <Grid container spacing={2}>

                            <Grid item xs={4}>
                                <img src={watch1} style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={8}>
                                <Stack mb={1}>
                                    <Typography className='time'>Tech </Typography>
                                </Stack>
                                <Typography className='post-title' sx={{
                                    "&:hover": {
                                        color: "#9c61cc"
                                    }
                                }} >
                                    your car is a reflection of your style
                                </Typography>

                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
                <Divider sx={{my:1,borderBottom:"2px solid #efefef"}} />
                <Stack>
                    <Stack sx={{

                    }}>
                        <Grid container spacing={2}>

                            <Grid item xs={4}>
                                <img src={game} style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={8}>
                                <Stack mb={1}>
                                    <Typography className='time'>Tech </Typography>
                                </Stack>
                                <Typography className='post-title' sx={{
                                    "&:hover": {
                                        color: "#9c61cc"
                                    }
                                }} >
                                 Expert Tips for Buying Used Sports Car
                                </Typography>

                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
                <Divider sx={{my:1,borderBottom:"2px solid #efefef"}} />
                <Stack>
                    <Stack sx={{
                    }}>
                        <Grid container spacing={2}>

                            <Grid item xs={4}>
                                <img src={game1} style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={8}>
                                <Stack mb={1}>
                                    <Typography className='time'>Tech </Typography>
                                </Stack>
                                <Typography className='post-title' sx={{
                                    "&:hover": {
                                        color: "#9c61cc"
                                    }
                                }} >
                               Turn your wounds into wisdom
                                </Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default Tech