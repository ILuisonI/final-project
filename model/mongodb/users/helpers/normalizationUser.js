const normalizeUser = (userData) => {
  if (!userData.imageUrl) {
    userData.imageUrl = null;
  }
  userData.imageUrl =
    userData.imageUrl ||
    "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg";

  userData.imageAlt = userData.imageAlt || "yellow fluffy chickens";
  return {
    ...userData,
    state: userData.state || "",
  };
};

module.exports = normalizeUser;