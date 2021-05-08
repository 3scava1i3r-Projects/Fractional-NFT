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
    margin: 5,
    borderRadius: "20px",
    backgroundColor: "#4f4d4d",
    color: "white",
  },
  media: {
    height: 200,
    width: 245,
  },
});


export default function NFTselect(props) {

  

    const classes = useStyles();
    return (
      <div>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.data.image_url}
              title={props.data.asset_contract.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ color: "white" }}
              >
                {props.data.asset_contract.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ color: "white" }}
              >
                {props.data.id}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              style={{ color: "white" }}
              size="medium"
              color="primary"
              onClick={() => {
                props.Choose(props.data.image_url);
                props.type(props.data.asset_contract.asset_contract_type);
                props.contractadd(props.data.asset_contract.address);
                props.tkid(props.data.token_id);
              }}
            >
              Choose
            </Button>
            <Button
              style={{ color: "white" }}
              size="medium"
              color="primary"
              href={props.data.permalink}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
}






