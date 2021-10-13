export default function NameAPI(req, res) {
  res.status(200).json([
    { 
      value: 'hilmi',
      name: 'Hilmi Can Taşkıran',
      price: 500
    },
    {
      value: 'muhammet',
      name: 'Muhammet Enes Aydoğan',
      price: 750
    },
    {
      value: 'bulent',
      name: 'Bülent Demir',
      price: 500
    }])
}
