function addCouponToLocalStorage(userID, couponPrice = 0) {
  let existingUserData = localStorage.getItem("UserCouponDetails");
  let userDataArray = [];

  if (existingUserData) {
    userDataArray = JSON.parse(existingUserData);
    let existingUserDataIndex = userDataArray.findIndex(
      (item) => item.userID === userID
    );

    if (existingUserDataIndex !== -1) {
      userDataArray[existingUserDataIndex].couponPrice = couponPrice;
    } else {
      userDataArray.push({ userID, couponPrice });
    }
  } else {
    userDataArray.push({ userID, couponPrice });
  }
  localStorage.setItem("UserCouponDetails", JSON.stringify(userDataArray));
}

function getItemAndCouponPrice(userID) {
  let existingUserData = localStorage.getItem("UserCouponDetails");

  if (existingUserData) {
    let userDataArray = JSON.parse(existingUserData);

    let userEntry = userDataArray.find((item) => item.userID === userID);

    if (userEntry) {
      return {
        userID: userEntry.userID,
        couponPrice: userEntry.couponPrice,
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function setUserCouponDetails(userId) {
  let existingUserData = localStorage.getItem("UserCouponDetails");
  let userDataArray = [];

  if (existingUserData) {
    userDataArray = JSON.parse(existingUserData);
    let existingUserDataIndex = userDataArray.findIndex(
      (item) => item.userID === userId
    );
    if (existingUserDataIndex !== -1) {
      userDataArray[existingUserDataIndex].couponPrice = "0";
    }
  }
}

export { getItemAndCouponPrice, addCouponToLocalStorage , setUserCouponDetails};
