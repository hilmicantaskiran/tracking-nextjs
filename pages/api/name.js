export default function NameAPI(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
