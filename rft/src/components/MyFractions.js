import { ListItem, List, ListItemText, Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from 'react'
import { ethers } from "ethers";


const SW = require("../abi/ShardedWallet.json");


const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#26443e",
  },
}));


let balance;



export default function MyFractions(props) {
    const [bal, setbal] = useState();

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
    return (
      <div>
        <List
          component="nav"
          className={classes.root}
          aria-label="mailbox folders"
        >
          <ListItem>
            <ListItemText primary={props.shard.symbol} />
          </ListItem>
          <ListItem>
            <ListItemText primary={props.shard.name} />
          </ListItem>
          <Divider orientation="vertical" flexItem />
          <ListItem>
            <ListItemText primary={bal} />
          </ListItem>
        </List>
      </div>
    );
}
