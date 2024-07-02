import axios from "axios";
import React, { useEffect, useState } from "react";
import { GlobalStyles } from "./globalstyles";
import Normal from "./component/normal";
import GX from "./component/gx";
import "./style/style";
import EX from "./component/ex";
import Rare from "./component/rare";
import Rainbow from "./component/rainbow";
import Vmax from "./component/vmax";
import Header from "./component/header";

interface ImgProps {
  images: {
    large: string;
    small: string;
  };
}

function App() {
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("https://api.pokemontcg.io/v2/cards?q=name:Pikachu");
        const cards: ImgProps[] = response.data.data;
        setImgUrls(cards.map((card) => card.images.large));
        console.log(cards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="App">
        <Header />
        <Normal />
        <Rare />
        <Vmax />
        <Rainbow />
        <GX />
        <EX />
      </div>
    </>
  );
}

export default App;
