

const TahminKelime = ({ correctWords }) => {
 

  return (
    <div className="tahmin-wrapper">
      <p className="tahmin-baslik">Kelimeniz:</p>
      <p className="tahmin-harfler">{correctWords}</p>
    </div>
  )
}

export default TahminKelime;