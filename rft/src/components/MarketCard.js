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
    width:345,
    maxWidth: 345,
    margin: 20,
    borderRadius: "20px",
    backgroundColor: "#4f4d4d",
    color: "white",
  },
  media: {
    height: 300,
    width: 345,
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
  const [lb, setlb] = useState([]);
  let history = useHistory();

  // console.log(history)

  console.log(props.l.wid);

  /*  const options = { method: "GET" };
 fetch(
   `https://rinkeby-api.opensea.io/api/v1/assets?format=json&limit=1&token_id=${props.l.tkid}&asset_contract_address=${props.l.add}`,
   options
 ).then(async (response) => {
   const a = await response.json();
   console.log(a);
   //console.log(a.assets[0].image_url);
 }); */

/*   axios
   .get(
     `https://testnets-api.opensea.io/api/v1/metadata/${props.l.add}/${props.l.tkid}`
   )
   .then(async (r) => {
     try {
       console.log(r.data.image)
     } catch (e) {
       console.log(e);
     }
   }); 
 */
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            alt=""
            height="140"
            image={
              "https://fsb.zobj.net/crop.php?r=EM5LIvQt434IQSQgdH7plSKcwyau8htETrUUY0oemwJ_j-jcLAiobfDpf_42sEYNR1dFoOpKtwgBbt5kzleU4ekusCeFZewbT4OWT_z9XYnQqgBF5LVw5GSv7DFdJvS9JdlGV5KWeUTgeDEU"
            }
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
            style={{ color: "white", marginLeft: "40px" }}
            size="small"
            color="primary"
            href={`/${props.l.wid}`}
            onClick={() => {
              props.history.push({
                pathname: `/${props.l.wid}`,
                state: props.l.wid,
                price: props.l.price,
              });
            }}
          >
            Buy
          </Button>
          <Button
            style={{ color: "white", marginLeft: "85px" }}
            size="small"
            color="primary"
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={{
                pathname: `/${props.l.wid}`,
                state: (props.l.wid),
                price:(props.l.price)
              }}
              className="btn btn-primary"
            >
              More info
            </Link>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}