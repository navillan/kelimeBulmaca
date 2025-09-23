import { useEffect, useState } from "react";


const TahminKelime = ({ correctWords }) => {
 

  return (
    <p className="tahmin-harfler">Kelimeniz:  {correctWords}</p>
  )
}

export default TahminKelime;