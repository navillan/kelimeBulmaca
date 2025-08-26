

const useCheckValidWord = (tahminKelime, kelimelerArray) => {
  const kelimelerLibrary = kelimelerArray.flatMap(obj => Object.values(obj)
  );

  let isValid = false;
  if (kelimelerLibrary.includes(tahminKelime.join(""))) {
    isValid = true;
  }

  console.log("Kelimeler Kütüphanesi:", kelimelerLibrary);
  return isValid;
}

export default useCheckValidWord;