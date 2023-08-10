const normalizePlant = async (plant, userId) => {
  if (!plant.image) {
    plant.image = {};
  }
  plant.image = {
    url:
      plant.image.url ||
      "https://media.istockphoto.com/id/1367401626/vector/set-silhouette-houseplant-indoor-black-and-white-house-plants-in-flower-pot-outline-doodle.jpg?s=612x612&w=0&k=20&c=gK5r92EcNkMfQKTbsm3Hqx6Cw0OYGf8-fAuRzkFCmBs=",
    alt: plant.image.alt || "Plant",
  };
  return {
    ...plant,
    address: {
      ...plant.address,
      state: plant.address.state || "",
    },
    user_id: plant.user_id || userId,
  };
};

module.exports = normalizePlant;