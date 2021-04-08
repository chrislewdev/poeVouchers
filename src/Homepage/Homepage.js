import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
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
import Listing from "./Listing";
import ListingPage from "./ListingPage";

function Homepage() {
  const [selectedCategories, setSelectedCategories] = useState("");

  const [selectedCategoriesArray, setSelectedCategoriesArray] = useState([]);

  const [selectedServices, setSelectedServices] = useState("");

  const [listingsQuery, setListingsQuery] = useState(null);

  const [value, dataLoading, dataError] = useCollectionDataOnce(listingsQuery);

  const [listingsArray, setListingsArray] = useState([]);

  const [listingPage, toggleListingPage] = useState(false);

  const [currentDocID, setCurrentDocID] = useState("");

  useEffect(() => {
    if (value != undefined) {
      setListingsArray(value);
    }
  }, [value]);

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
        setListingsArray([]);
      }}
      activeButton={selectedCategories}
    />
  ));

  const servicesRender = selectedCategoriesArray.map((service) => (
    <SelectionButton
      buttonName={service}
      handleClick={() => {
        setSelectedServices(service);
        const query = db
          .collection("listings")
          .where("selectedServices", "==", service);
        setListingsQuery(query);
      }}
      activeButton={selectedServices}
    />
  ));

  const listingRender = listingsArray.map((listing) => (
    <Listing
      listing={listing}
      handleClick={(docID) => {
        setCurrentDocID(docID);
        toggleListingPage(true);
      }}
    />
  ));

  return listingPage ? (
    <ListingPage
      toggleListingPage={() => toggleListingPage(false)}
      docID={currentDocID}
    />
  ) : (
    <div>
      <Head />
      <div className={"homepage-container"}>
        <div className={"box1"}></div>
        <div className={"box2"}>CATEGORIES</div>
        <div className={"box3"}>SERVICES</div>
        <div className={"box4"}>LISTINGS</div>
        <div className={"box5"}>{categoriesRender}</div>
        <div className={"box6"}>{servicesRender}</div>
        <div className={"box7"}>
          {dataLoading ? "loading..." : listingRender}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
