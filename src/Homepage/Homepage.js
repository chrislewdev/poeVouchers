import React, { useState } from "react";
import SelectionButton from "../Global/SelectionButton";
import Head from "./Head";
import "./Homepage.css";

function Homepage() {
  const categoriesArray = [
    "temple",
    "syndicate",
    "bosses carry",
    "bench crafts",
    "challenges",
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

  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoriesRender = categoriesArray.map((category) => (
    <SelectionButton
      buttonName={category}
      handleClick={() => setSelectedCategories(category)}
    />
  ));

  const servicesRender = services.Array.map((service) => (
    <SelectionButton
      buttonName={service}
      handleClick={() => setSelectedCategories(category)}
    />
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
        <div className={"box6"}></div>
        <div className={"box7"}></div>
      </div>
    </div>
  );
}

export default Homepage;
