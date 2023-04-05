import { Box, Button, Card, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';

const Login = () => {
    return (
        <>
            <Box bgcolor={'background.primary'}>
                <Container>
                    <Grid container sx={{ height: "100vh", display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <Grid xs={12} md={6}>
                            <Card sx={{ p: 8, bgcolor: "background.default", borderRadius: 5, boxShadow: 5 }}>
                                <Typography sx={{ textAlign: "center", fontWeight: 600, fontSize: { xs: "24px", md: "28px" } ,color:"text.primary"}}> Admin Login</Typography>
                                <Stack mt={6} spacing={6}>
                                    <TextField placeholder='Email' type={"email"} variant="standard" sx={{ bgcolor: "background.success", borderRadius: 10, py: "8px", px: 2 }} InputProps={{
                                        disableUnderline: true, startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutlineIcon  />
                                            </InputAdornment>
                                        ),
                                    }} />
                                    <TextField size='large' placeholder='Password' type={"Password"} variant="standard" sx={{bgcolor: "background.success", borderRadius: 10, py: "8px", px: 2, mt: 3 }} InputProps={{
                                        disableUnderline: true, startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>)  
                                    }} />
                               
                                <Stack mt={3}>
                                    <Stack sx={{ display: "flex", alignItems: "center" }}>
                                        <Button variant='contained' sx={{ width: "100%", borderRadius: "50px", textTransform: 'none', fontWeight: 600,color:"text.primary" }}>Login</Button>
                                    </Stack>
                                    </Stack>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>

            </Box>
        </>
    )
}

export default Login