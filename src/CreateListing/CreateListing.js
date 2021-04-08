import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../Firebase";
import SelectionButton from "../Global/SelectionButton";
import { UserContext } from "../Global/UserContext";
import "./CreateListing.css";
import {
  categoriesArray,
  templeArray,
  syndicateArray,
  bossArray,
  benchArray,
  challengeArray,
} from "../Global/Arrays";

function CreateListing() {
  const { currentUser, currentUserData } = useContext(UserContext);

  const [selectedCategories, setSelectedCategories] = useState("");

  const [selectedCategoriesArray, setSelectedCategoriesArray] = useState([]);

  const [selectedServices, setSelectedServices] = useState("");

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

  const servicesRender = selectedCategoriesArray.map((service) => (
    <SelectionButton
      buttonName={service}
      handleClick={() => setSelectedServices(service)}
      activeButton={selectedServices}
    />
  ));

  const [serviceTitle, setServiceTitle] = useState("");
  const handleChangeServiceTitle = (e) => setServiceTitle(e.target.value);

  const [serviceDetail, setServiceDetail] = useState("");
  const handleChangeServiceDetail = (e) => setServiceDetail(e.target.value);

  const [servicePrice, setServicePrice] = useState("");
  const handleChangeServicePrice = (e) => setServicePrice(e.target.value);

  const resetForm = () => {
    setServiceDetail("");
    setServiceTitle("");
    setServicePrice("");
  };

  const handleSubmitClick = () => {
    const newDocID = uuidv4();
    db.collection("listings")
      .doc(newDocID)
      .set({
        title: serviceTitle,
        detail: serviceDetail,
        price: servicePrice,
        sellerUID: currentUser.uid,
        sellerUsername: currentUserData[0].username,
        sellerVouches: currentUserData[0].vouches,
        selectedServices: selectedServices,
        vouched: false,
        vouchedByUsername: "",
        vouchedByUID: "",
        docID: newDocID,
      })
      .then(() =>
        db
          .collection("users")
          .doc(`${currentUser.uid}`)
          .update({
            listingCreated: currentUserData[0].listingCreated + 1,
          })
      )
      .then(() => alert("Listing successful"))
      .then(resetForm);
  };

  return (
    <div className="cl-background">
      <div className="cl-wrapper">
        <div className="cl-title">Create Listing</div>
        <div className="cl-body-container">
          <div className="cl-box-one">CATEGORIES</div>
          <div className="cl-box-two">SERVICES</div>
          <div className="cl-box-three"></div>
          <div className="cl-box-four">{categoriesRender}</div>
          <div className="cl-box-five">{servicesRender}</div>
          <div className="cl-box-six">
            <div className="cl-service-title-box">
              <input
                type="text"
                placeholder="title here ..."
                value={serviceTitle}
                maxlength="46"
                onChange={handleChangeServiceTitle}
                className="cl-service-title"
              ></input>
            </div>
            <div className="cl-service-price-box">
              <input
                type="text"
                placeholder="price here ..."
                value={servicePrice}
                maxlength="10"
                onChange={handleChangeServicePrice}
                className="cl-service-price"
              ></input>
            </div>
            <div className="cl-service-detail-box">
              <input
                type="text"
                placeholder="more details here ..."
                value={serviceDetail}
                maxlength="100"
                onChange={handleChangeServiceDetail}
                className="cl-service-detail"
              ></input>
            </div>
            <div
              onClick={handleSubmitClick}
              className="cl-service-submit-button"
            >
              SUBMIT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
