export default function NameAPI(req, res) {
  res.status(200).json({ 
    name: 'Hilmi Can Taşkıran',
    price: 500
  })
}
