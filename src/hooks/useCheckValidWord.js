

function useCheckValidWord (setIsValidWord, tahminKelime, kelimelerArray) {
  const kelimelerLibrary = kelimelerArray.flatMap(obj => Object.values(obj)
  );

  if (kelimelerLibrary.includes(tahminKelime.join(""))) {
    setIsValidWord(true)
  }

  console.log("Kelimeler Kütüphanesi:", kelimelerLibrary);
  return { setIsValidWord };
}

export default useCheckValidWord;