import React  from 'react'
import { Button } from "@material-ui/core"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import './Category.css'

const styles = {
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      marginRight: '20px',
      height: 100,
      width : '80px',
      padding : '0 70px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  };
const Category = (props) => {


      const { classes } = props
    return (
<div className = "category">
    <section>
    <h1 className = "title">Select the Category</h1>
        <ul>
            <li>
            <Button href = '/play/Quiz' className = {classes.root} variant="contained" color="secondary">General Knowledge</Button>  
            <Button href = '/play/Quiz' className = {classes.root} variant="contained" color="secondary">Mathematics</Button>  
            <Button href = '/play/Quiz' className = {classes.root} variant="contained" color="secondary">Science</Button>  
            </li>
        </ul>
    </section>
</div>
    );
}
Category.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
}
   

export default withStyles(styles)(Category);