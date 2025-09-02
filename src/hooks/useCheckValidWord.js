import { useState } from "react";

function useCheckValidWord (setIsValidWord, tahminKelime, kelimelerArray) {
  debugger;
  const kelimelerLibrary = kelimelerArray.flatMap(obj => Object.values(obj)
  );

  if (kelimelerLibrary.includes(tahminKelime.join(""))) {
    setIsValidWord(true)
  }

  console.log("Kelimeler Kütüphanesi:", kelimelerLibrary);
  return { setIsValidWord };
}

export default useCheckValidWord;