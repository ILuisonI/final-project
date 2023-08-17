const normalizePlant = (plant, userId) => {
  if (!plant.imageUrl) {
    plant.imageUrl = null;
  }
  if (userId) {
    plant.user_id = userId;
  }
  plant.imageUrl =
    plant.imageUrl ||
    "https://media.istockphoto.com/id/1367401626/vector/set-silhouette-houseplant-indoor-black-and-white-house-plants-in-flower-pot-outline-doodle.jpg?s=612x612&w=0&k=20&c=gK5r92EcNkMfQKTbsm3Hqx6Cw0OYGf8-fAuRzkFCmBs=";
  plant.imageAlt = plant.imageAlt || "Plant";
  return {
    ...plant
  };
};

module.exports = normalizePlant;