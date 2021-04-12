import React from "react";
import "./HowToPage.css";
import homepagepng from "../Assets/Homepage.png";
import profilepagepng from "../Assets/Profilepage.png";
import userlistingpagepng from "../Assets/UserListingpage.png";
import createpng from "../Assets/Create.png";

function HowToPage() {
  return (
    <div className="howto-background">
      <div className="howto-container">
        <div className="howto-title">
          I TEACH YOU HOW TO USE THE WEBSITE !!!
        </div>
        <div>
          <div className="howto-content-wrapper">
            <div className="howto-heavy">REGISTER</div>
            <div className="howto-light">
              Currently the site is only open for verified users due to
              limitation of resources.
              <br />
              For registration, please send an email to poevouchers@gmail.com
              <br />
              Required details:
              <br />
              1. Username
              <br />
              2. Email
              <br />
              3. Password
              <br />
              4. Discord
              <br />
              5. Poe Profile
            </div>
          </div>
          <div className="howto-content-wrapper">
            <div className="howto-heavy">VOUCH SYSTEM</div>
            <div className="howto-light">
              1. Buyers should vouch the respective listings after the service
              is completed in-game.
              <br />
              2. Sellers can then complete the listing in their Profile and gain
              +1 vouch.
              <br />
              3. One listing can only hold One vouch at a time
            </div>
          </div>
          <div className="howto-content-wrapper">
            <div className="howto-heavy">HOMEPAGE</div>
            <div className="howto-light">
              The homepage shows all the listings available in their respective
              categories.
              <br />
              If you have any suggestions for new categories or services, please
              drop us an email !
            </div>
          </div>
          <img src={homepagepng} />
          <div className="howto-content-wrapper">
            <div className="howto-heavy">PROFILE</div>
            <div className="howto-light">
              This is your profile page, you can:
              <br />
              1. View your profile
              <br />
              2. Manage your live listings
              <br />* You can have up to maximum 5 listings at a time.
            </div>
          </div>
          <img src={profilepagepng} />
          <div className="howto-content-wrapper">
            <div className="howto-heavy">MANAGE YOUR LISTING</div>
            <div className="howto-light">
              This page displays all the details of your listing.
              <br />
              You can:
              <br />
              1. Edit your listings
              <br />
              2. Delete your listings
              <br />
              3. Complete your listings
              <br />
              * By clicking complete, you will gain +1 vouch, and your listing
              will be automatically deleted
              <br />* Only listing that has been vouched by other players can be
              completed
            </div>
          </div>
          <img src={userlistingpagepng} />
          <div className="howto-content-wrapper">
            <div className="howto-heavy">CREATE LISTING</div>
            <div className="howto-light">
              Create a new listing here
              <br />
              1. Select categories and services
              <br />
              2. Enter title, price and related details
              <br />
              3. Click Submit !
            </div>
          </div>
          <img src={createpng} />
        </div>
      </div>
    </div>
  );
}

export default HowToPage;
