export default function handler(req, res) {
  res.status(200).json({
    success: true,
    message: "DYOP VIDEO PREVIEW FUNCTION IS WORKING",
    id: req.query.id || null
  });
}