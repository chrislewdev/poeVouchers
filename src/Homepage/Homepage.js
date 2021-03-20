import React, { useState } from "react";
import SelectionButton from "../Global/SelectionButton";
import Head from "./Head";
import "./Homepage.css";
import {
  categoriesArray,
  templeArray,
  syndicateArray,
  bossArray,
  benchArray,
  challengeArray,
} from "../Global/Arrays";

function Homepage() {
  const [selectedCategories, setSelectedCategories] = useState("");

  const [selectedCategoriesArray, setSelectedCategoriesArray] = useState([]);

  const [selectedServices, setSelectedServices] = useState("");

  // const categoriesRender = categoriesArray.map((category) => (
  //   <SelectionButton
  //     buttonName={category}
  //     handleClick={() => {
  //       if (category === "temple") setSelectedCategories(templeArray);
  //       if (category === "syndicate") setSelectedCategories(syndicateArray);
  //       if (category === "boss carry") setSelectedCategories(bossArray);
  //       if (category === "bench craft") setSelectedCategories(benchArray);
  //       if (category === "challenge") setSelectedCategories(challengeArray);
  //     }}
  //   />
  // ));

  const categoriesRender = categoriesArray.map((category) => (
    <SelectionButton
      buttonName={category}
      handleClick={() => {
        if (category === "temple") {
          setSelectedCategories(category);
          setSelectedCategoriesArray(templeArray);
        }
        if (category === "syndicate") {
          setSelectedCategories(category);
          setSelectedCategoriesArray(syndicateArray);
        }
        if (category === "boss carry") {
          setSelectedCategories(category);
          setSelectedCategoriesArray(bossArray);
        }
        if (category === "bench craft") {
          setSelectedCategories(category);
          setSelectedCategoriesArray(benchArray);
        }
        if (category === "challenge") {
          setSelectedCategories(category);
          setSelectedCategoriesArray(challengeArray);
        }

        setSelectedServices("");
      }}
      activeButton={selectedCategories}
    />
  ));

  // const servicesRender = selectedCategories.map((service) => (
  //   <SelectionButton buttonName={service} />
  // ));

  const servicesRender = selectedCategoriesArray.map((service) => (
    <SelectionButton
      buttonName={service}
      handleClick={() => setSelectedServices(service)}
      activeButton={selectedServices}
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
        <div className={"box6"}>{servicesRender}</div>
        <div className={"box7"}></div>
      </div>
    </div>
  );
}

export default Homepage;
