
import { useState, useEffect } from "react";

export default function Meme(){
    const[memesData, setMemesData] = useState("")

    const [meme, setMeme] =useState({
        topText:"One does not simply",
        bottomText:"Walk into Mordor",
        memeImg:"https://i.imgflip.com/1bij.jpg"
    })

    function handleForm(event){
        const {name, value} = event.target 
        setMeme((prevMeme)=>({...prevMeme, [name]: value}))
    }

    function getRandomMeme(){    
        const memeImgSrc = memesData[Math.floor(Math.random() * 100)].url;
        setMeme({...meme, memeImg: memeImgSrc}) 
    }
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(data => setMemesData(data.data.memes))
    }, [])
    
    return(
    <main>
        <div className="form">
            <input 
                type="text"
                placeholder="Top text"
                className="form--input"
                name="topText"
                onChange={handleForm}
                value={meme.topText}
            />
            <input 
                type="text"
                placeholder="Bottom text"
                className="form--input"
                name="bottomText"
                onChange={handleForm}
                value={meme.bottomText}
            />
            <button 
                className="form--button"
                onClick={getRandomMeme}
            >
                Get a new meme image 🖼
            </button>
        </div>
            <div className="meme">
                <img src={meme.memeImg}  className="meme--image"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
    </main>
    )
}