import { Avatar, Card, Container, Divider, Grid, Paper, Rating, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import './index.css'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MessageIcon from '@mui/icons-material/Message';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Fashion from '../../components/fashion';
import Popular from '../../components/Popular';
import PopularPost from '../../components/PopularPost';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff3d47',

    },
    '& .MuiRating-iconHover': {
        color: '#ff6d75',
    },
});

const Post = () => {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={{ bgcolor: "background.primary", pb: 3 }} >
                <Container maxWidth={"xl"}>
                    <Stack>
                        <Typography sx={{ fontSize: "24px", color: "text.primary", fontWeight: 600, lineHeight: "20      px" }}>Latest</Typography>
                        <Divider sx={{ color: "1px solid divider", mb: 2 }} />
                    </Stack>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" } }} >
                            <Card sx={{p:3,bgcolor:"background.secondary"}}>
                                <PopularPost />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} className="posts">
                            <Fashion items={[1,2,3,4,5,6,7,8,9]}/>
                        </Grid>
                        <Grid item xs={3}>
                            <img width={'100%'} height={'100%'} src={require('../../assets/ad.png')}/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Post