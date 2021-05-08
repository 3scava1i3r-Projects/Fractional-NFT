import { ListItem, List, ListItemText, Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from 'react'
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const SW = require("../abi/ShardedWallet.json");


const useStyles = makeStyles(() => ({
  root: {
    width: 345,
    maxWidth: 345,
    backgroundColor: "#4f4d4d",
    borderRadius: "20px",
  },
}));


let balance;



export default function MyFractions(props) {
    const [bal, setbal] = useState();
  console.log(props.shard)
    const getBalance = async() => {
      const SWcontract = new ethers.Contract(
        props.shard.id,
        SW.abi,
        props.prov
      );
      balance = await SWcontract.balanceOf(props.shard.owner);
      console.log(balance.toString())
      setbal(balance.toString()/1000000000000000000);
    };
    getBalance();

    
    const classes = useStyles();
    return bal !== 0 ? (
      <div style={{ margin: 10 }}>
        <List
          component="nav"
          className={classes.root}
          aria-label="mailbox folders"
        >
          <ListItem>
            <ListItemText
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              primary={props.shard.symbol}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              primary={props.shard.name}
            />
          </ListItem>
          <Divider orientation="vertical" flexItem />
          <ListItem>
            <ListItemText
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              primary={bal}
            />
          </ListItem>
          <Divider orientation="vertical" flexItem />
          <ListItem>
            <ListItemText
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              primary={
                <a
                  style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                  href={`https://rinkeby.etherscan.io/token/${props.shard.id}`}
                >
                  {" "}
                  Shard Info
                </a>
              }
            />
          </ListItem>
        </List>
      </div>
    ) : null;
}
