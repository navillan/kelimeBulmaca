

function useCheckValidWord (setIsValidWord, tahminKelime, kelimelerArray) {
  const kelimelerLibrary = kelimelerArray.flatMap(obj => Object.values(obj)
  );

  if (kelimelerLibrary.includes(tahminKelime.join(""))) {
    setIsValidWord(true)
  }

  return { setIsValidWord };
}

export default useCheckValidWord;