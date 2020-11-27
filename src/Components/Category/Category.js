import React  from 'react'
import { Button } from "@material-ui/core"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import './Category.css'

const styles = {
    root: {
      background: '#fa7f72',
      borderRadius: 3,
      border: 0,
      color: 'white',
      marginRight: '20px',
      height: 100,
      width : '80px',
      padding : '0 70px',
    },
  };
const Category = (props) => {


      const { classes } = props
    return (
<div >
    <section className = "category">
    <h1 className = "title">Select Category</h1>
        <ul>
            <li>
            <Button href = '/play/Quiz' className = {classes.root} variant="contained" color="secondary">General Knowledge</Button>  
            <Button href = '/play/Maths' className = {classes.root} variant="contained" color="secondary">Mathematics</Button>  
            <Button href = '/play/Sports' className = {classes.root} variant="contained" color="secondary">Sports</Button>  
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