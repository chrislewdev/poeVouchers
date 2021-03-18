import React, { useState } from "react";
import SelectionButton from "../Global/SelectionButton";
import Head from "./Head";
import "./Homepage.css";

function Homepage() {
  const categoriesArray = [
    "temple",
    "syndicate",
    "boss carry",
    "bench craft",
    "challenge",
  ];

  const templeArray = [
    "double corruption",
    "gem corruption",
    "sacrifice chamber",
  ];

  const syndicateArray = [
    "white sockets",
    "leo slam",
    "hillock weapon",
    "hillock armour",
    "hillock flask",
    "hillock map",
  ];

  const bossArray = ["all bosses", "sirus", "uber atziri"];

  const benchArray = ["all crafts", "all crafts except"];

  const challengeArray = ["encounter", "end game grind"];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoriesRender = categoriesArray.map((category) => (
    <SelectionButton
      buttonName={category}
      handleClick={() => {
        if (category === "temple") setSelectedCategories(templeArray);
        if (category === "syndicate") setSelectedCategories(syndicateArray);
        if (category === "boss carry") setSelectedCategories(bossArray);
        if (category === "bench craft") setSelectedCategories(benchArray);
        if (category === "challenge") setSelectedCategories(challengeArray);
      }}
    />
  ));

  const servicesRender = selectedCategories.map((service) => (
    <SelectionButton buttonName={service} />
  ));

  return (
    <div>
      <Head />
      <div className={"homepage-container"}>
        <div className={"box1"}></div>
        <div className={"box2"}>CATEGORIES</div>
        <div className={"box3"}>SERVICES</div>
        <div className={"box4"}>LISTINGS</div>
        <div className={"box5"}>{categoriesRender}</div>
        <div className={"box6"}>{servicesRender}</div>
        <div className={"box7"}></div>
      </div>
    </div>
  );
}

export default Homepage;
