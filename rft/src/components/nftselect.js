import { checkProperties } from 'ethers/lib/utils'
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin:5
  },
  media: {
    height: 200,
    width: 245,
    
  },
});


const Choose = async() => {

}


export default function NFTselect(props) {

    const classes = useStyles();
    return (
      <div>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.data.image_url}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.data.asset_contract.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.data.id}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="medium" color="primary" onClick={Choose}>
              Choose
            </Button>
            <Button size="medium" color="primary" href={props.data.permalink}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
}






