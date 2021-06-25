import React from "react"
import axios from "axios"

import "./App.css"
import "fontsource-roboto"
import "./assets/scss/style.scss"

import Swal from "sweetalert2"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import Backdrop from "@material-ui/core/Backdrop"
import TextField from "@material-ui/core/TextField"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles"

import EmailIcon from "@material-ui/icons/Email"
import GitHubIcon from "@material-ui/icons/GitHub"
import LanguageIcon from "@material-ui/icons/Language"
import LinkedInIcon from "@material-ui/icons/LinkedIn"
import InstagramIcon from "@material-ui/icons/Instagram"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"

import API from "./config"

const muiTheme = createMuiTheme({
  palette: {
    secondary: {
      main: "#76ff03",
    },
  },
})

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 227,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 10,
  },
  multilineColor: {
    color: "#76ff03", // "#ff1744",
  },
}))

function App() {
  const classes = useStyles()

  const [loading, setLoading] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
  const [message, setMessage] = React.useState(null)

  const handleChangeInput = (event) => {
    if (event.target.name === "message") {
      setMessage(event.target.value)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    const payload = {
      message,
    }
    await axios
      .post(`${API.backend}post`, payload)
      .then((response) => {
        console.log(response)
        if (response.data && response.data.message) {
          setLoading(false)
          console.log(response.data.message)
          Swal.fire(
            "Thank you!",
            "Your message has been successfully sent",
            "success"
          )
        } else {
          setLoading(false)
          console.log("error response")
          Swal.fire(
            "Oops!",
            "Something went wrong! Please try again later",
            "error"
          )
        }
      })
      .catch((e) => {
        console.log("error catch")
        console.log(e.response)
        Swal.fire(
          "Oops!",
          "Something went wrong! Please try again later",
          "error"
        )
      })
  }

  React.useEffect(() => {
    async function checkDisabled() {
      if (!message || loading) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }
    checkDisabled()
  }, [message, loading])

  return (
    <MuiThemeProvider theme={muiTheme}>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <Container>
              <Backdrop
                className={classes.backdrop}
                open={loading}
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Grid container spacing={3} justify="center" my={10}>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom>
                    Hi,{" "}
                    <a
                      href="https://www.google.com/search?q=orang+baik+in+english"
                      target="_blank"
                      rel="noreferrer"
                      // styles={{ color: "#76ff03" }}
                    >
                      orang baik
                    </a>
                    !
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    My name is <b>Alfian (cimbot) Maulana</b>, and this is my
                    personal{" "}
                    <a
                      href="https://secreto.site/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      secreto
                    </a>
                    -like site.
                    <br />
                    Feel free to give me feedback, idea, suggestion, advice,{" "}
                    <i>curhat</i>, or anything else! I appreciate that and thank
                    you very much, have a nice day!
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="message"
                    label="Your Message"
                    variant="outlined"
                    onChange={handleChangeInput}
                    helperText={
                      message
                        ? "Feel free to send it anonymously or with your name/contact"
                        : ""
                    }
                    multiline
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ textTransform: "none" }}
                    disabled={disabled}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Container>
            <br />
            <Grid container justify="center">
              <Grid item xs={1}>
                <Link href="mailto:alfianm.ibrahim@gmail.com" target="_blank">
                  <EmailIcon />
                </Link>
              </Grid>
              <Grid item xs={1}>
                <Link href="https://github.com/alfinm01" target="_blank">
                  <GitHubIcon />
                </Link>
              </Grid>
              <Grid item xs={1}>
                <Link href="https://alfianmaulana.com" target="_blank">
                  <LanguageIcon />
                </Link>
              </Grid>
              <Grid item xs={1}>
                <Link
                  href="https://www.linkedin.com/in/alfinm01/"
                  target="_blank"
                >
                  <LinkedInIcon />
                </Link>
              </Grid>
              <Grid item xs={1}>
                <Link
                  href="https://www.instagram.com/alfian.maulanai/"
                  target="_blank"
                >
                  <InstagramIcon />
                </Link>
              </Grid>
              <Grid item xs={1}>
                <Link
                  href="https://medium.com/@alfianm.ibrahim"
                  target="_blank"
                >
                  <LibraryBooksIcon />
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default App
