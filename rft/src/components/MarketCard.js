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

let m = 0;



export default function MarketCard(props) {

  const [lb ,setlb] = useState([]);




if (props.d.asWallet !== null && props.d.asWallet.crowdsales[0] !== undefined) {
  axios
    .post("https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-custody", {
      query: `
                {
                  wallet(id: "${props.d.asWallet.id}" ){
                    id
                    nfts{
                      name
                      symbol
                      id
                      
                    }
                  }
                }
                  `,
    })
    .then((res) => {
      if (res.data.data.wallet.nfts[0] !== undefined) {
        let k = res.data.data.wallet.nfts[0].id;

        let add = k.split("_")[0];
        let id = k.split("_")[1];

        setTimeout(() => {
          const options = { method: "GET" };
          fetch(
            `https://rinkeby-api.opensea.io/api/v1/assets?format=json&offset=0&token_id=${id}&asset_contract_address=${add}`,
            options
          ).then(async (response) => {
            const a = await response.json();
            console.log(a)
            
          });
        }, 7000);
        

        /* lb.push({ add, id }); */
      } else {
        lb.push("null", "null");
      }
    })
    .catch((err) => console.error(err));
}

console.log(lb);
   


  const classes = useStyles();
  
  
  return props.d.asWallet != null &&
    props.d.asWallet.crowdsales[0] !== undefined ? (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt=""
          height="140"
          image={props.d.id}
        />
        <CardContent className={classes.t}>
          <Typography
            gutterBottom
            variant="h6"
            component="h4"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {props.d.name}
            
            
          </Typography>
          {/* symbol */}
          <Chip label={props.d.symbol} />
          {/*  Price   */}
          
            
              <Typography
                gutterBottom
                variant="h7"
                component="h4"
                className={classes.text}
              >
                {props.d.asWallet.crowdsales[0].price.value}
              </Typography>

              <Typography
                gutterBottom
                variant="h7"
                component="h5"
                className={classes.text}
              >
                {props.d.asWallet.crowdsales[0].status}
              </Typography>
           
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
        <Button size="small" color="primary" href={props.d.permalink}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  ) : (
    <h1></h1>
  );
}