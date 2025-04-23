exports.sendHello = async (req, res) => {
  res.status(200).json({ message: "Hello from the useer!" });
};
