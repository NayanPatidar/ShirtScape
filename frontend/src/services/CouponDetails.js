function addCouponToLocalStorage(userID, couponPrice = 0) {
  let existingUserData = localStorage.getItem("UserCouponDetails");
  let userDataArray = [];

  if (existingUserData) {
    userDataArray = JSON.parse(existingUserData);
    console.log("Present");
    let existingUserDataIndex = userDataArray.findIndex(
      (item) => item.userID === userID
    );
    console.log(existingUserDataIndex);

    if (existingUserDataIndex !== -1) {
      userDataArray[existingUserDataIndex].couponPrice = couponPrice;
    } else {
      userDataArray.push({ userID, couponPrice });
    }
  } else {
    userDataArray.push({ userID, couponPrice });
  }
  console.log(userDataArray);
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

export { getItemAndCouponPrice, addCouponToLocalStorage };
