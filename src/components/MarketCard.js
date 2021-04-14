import React , { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import overflow from "@material-ui/core";
import axios from "axios";
import { Link , useHistory} from "react-router-dom";


 
const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    margin: 5,
  },
  media: {
    height: 200,
    width: 245,
  },
  text: {
    marginTop: 5,
  },
  t: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    
  },
});



export default function MarketCard(props) {

  const [lb ,setlb] = useState([]);
  let history = useHistory();


 /*  console.log(props.l) */
 console.log(props.l)


/*  setTimeout(() => {
   const options = { method: "GET" };
   fetch(
     `https://rinkeby-api.opensea.io/api/v1/assets?format=json&offset=0&token_id=${props.l.tkid}&asset_contract_address=${props.l.add}`,
     options
   ).then(async (response) => {
     const a = await response.json();
     console.log(a);
   });
 }, 7000); */


  const classes = useStyles();
  
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt=""
          height="140"
          image={props.l.id}
        />
        <CardContent className={classes.t}>
          <Typography
            gutterBottom
            variant="h6"
            component="h4"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {props.l.name}
          </Typography>
          {/* symbol */}
          <Chip label={props.l.symbol} />
          {/*  Price   */}

          <Typography
            gutterBottom
            variant="h7"
            component="h4"
            className={classes.text}
          >
            {props.l.price}
          </Typography>

          <Typography
            gutterBottom
            variant="h7"
            component="h5"
            className={classes.text}
          >
            {props.l.status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          href={`/${props.l.wid}`}
          onClick={() => {
            props.history.push({
              pathname: `/${props.l.wid}`,
              state: props.l.wid,
            });
          }}
        >
          Buy
        </Button>
        <Button size="small" color="primary">
          
          <Link
            to={{
              pathname: `/${props.l.wid}`,
              state: props.l.wid,
            }}
            className="btn btn-primary"
          >
            More info
          </Link>
        </Button>
      </CardActions>
    </Card>
  ); 
}