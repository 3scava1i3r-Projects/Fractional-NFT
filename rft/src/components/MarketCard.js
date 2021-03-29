import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    margin: 5,
    
  },
  media: {
    height: 200,
    width: 245,
  },
});

export default function MarketCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.data.image_url}
          title={props.data.asset_contract.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.name}
          </Typography>
          <Chip label={props.data.name} />
          {/* symbol */}
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.name}
          </Typography>
          {/* sale level */}
          <Typography gutterBottom variant="h7" component="h5">
            {props.data.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
        <Button size="small" color="primary" href={props.data.permalink}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}