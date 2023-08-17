const normalizePlant = async (plant, userId) => {
  if (!plant.imageUrl) {
    plant.imageUrl = null;
  }
  plant.image = {
    imageUrl:
      plant.imageUrl ||
      "https://media.istockphoto.com/id/1367401626/vector/set-silhouette-houseplant-indoor-black-and-white-house-plants-in-flower-pot-outline-doodle.jpg?s=612x612&w=0&k=20&c=gK5r92EcNkMfQKTbsm3Hqx6Cw0OYGf8-fAuRzkFCmBs=",
    imageAlt: plant.imageAlt || "Plant",
  };
  return {
    ...plant,
    user_id: plant.user_id || userId,
  };
};

module.exports = normalizePlant;