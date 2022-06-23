import {useState} from "react"




function Nftselect(props) {

    const [img, setimg] = useState(null)


    // if(props.l.image_url) {
    //     setimg(props.l.image_url)
    // }
    // else {
    //     setimg("https://img.icons8.com/pastel-glyph/344/nft.png") 
    // }


    return (
        <div>
            <div>
            {props.l.id}
            </div>
            <img src={props.l.image_url} />
            <div>title={props.l.asset_contract.name}</div>
            <button type="button" className="nes-btn" onClick={() => {props.choose(props.l)}}>Choose</button>
            <a
              
              href={props.l.permalink}
            >
              Learn More
            </a>
        </div>
    );
}

export default Nftselect;