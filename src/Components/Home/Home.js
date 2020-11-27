import React, { Fragment }  from 'react'
import { Helmet } from 'react-helmet'
import './Home.css'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


// We can inject some CSS into the DOM.
const styles = {
    root: {
      borderRadius: 3,
      border: 0,
      marginBottom: '30px',
      cursor: "pointer",
    
    },
    auth: {
        borderRadius: 3,
        border: 0,
        marginBottom: '30px',
        cursor: "pointer",
        marginRight : '35px',
        marginTop: '20px'
    }
  };

const Home = (props) => {

   

      const { classes } = props;

    return (


        <Fragment>
    
        <Helmet><title>Quiz-App -Home</title></Helmet>
        <div id = "home">
        <section>
            <h1 className = "title">Quiz App</h1>
            <div className = "start-button-container">
            <Button className = {classes.root} fullWidth = "true" href = "/play/Category" size = "large" variant="contained" color="secondary">Start</Button>
            </div>
            <div classname = "auth-container">
            <Button className = {classes.auth}  fullWidth = "true" size = "large" href = "/login" variant="contained" color="secondary">Signin</Button>
            <Button className = {classes.auth} fullWidth = "true" size = "large" href = "/register" variant="contained" color="secondary">SignUp</Button>
            </div>
            <div>

            </div>
        </section>
        </div>
    </Fragment>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
}
    
   

   



export default withStyles(styles)(Home);


