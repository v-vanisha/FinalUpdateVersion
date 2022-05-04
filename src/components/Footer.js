import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import NexumLogo from "../assets/NexumNewLogo.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" display="flex" justifyContent= "center" style={{fontSize:"15px"}}>
      {'© '}
      {new Date().getFullYear()}
      <Link color="inherit" href="/" style={{fontSize:"15px",textDecoration:"none",paddingLeft:"5px",paddingRight:"5px"}} >
         {'  Nexum  '}
      </Link>
         {'  All Rights Reserved.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // minHeight: '100vh',
        position:'sticky',
        left:0,
        bottom:0,
        right:0,
        mt: 'auto',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          paddingTop: "10px",
          px: 2,
          mt: 'auto',
          
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
            <Typography style={{height:"90px",display :"flex",justifyContent:"center",marginBottom:"10px"}}>
                <img alt="Nexum Logo" src={NexumLogo} />
            </Typography>
            <Typography variant="body1" color="#376bb4" display ="flex" justifyContent="center" marginBottom="5px" >
                <Link href="https://www.facebook.com/banasthali.org/" target="_blank">
                <FacebookIcon style={{marginRight:"25px",fontSize:"30px",}}/>
                </Link>
                <Link href="https://www.instagram.com/banasthali_vidyapith/?hl=en" target="_blank">
                <InstagramIcon style={{marginRight:"25px",fontSize:"30px"}}/>
                </Link>
                <Link href="https://twitter.com/banasthali_vid?lang=en" target="_blank">
                <TwitterIcon style={{marginRight:"25px",fontSize:"30px"}}/>
                </Link>
                <Link href="https://www.linkedin.com/school/banasthali-vidyapith/?originalSubdomain=in" target="_blank">
                <LinkedInIcon style={{marginRight:"25px",fontSize:"30px"}}/>
                </Link>
            </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}