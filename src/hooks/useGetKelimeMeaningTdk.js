/*
import { fetchWord } from "tdk-all-api";

async function useGetKelimeMeaningTdk(word) {
  try {
    const result = await fetchWord(word);
    debugger;
    // result.genel.anlamlarListe -> anlam listesi
    const meaning = result?.genel?.anlamlarListe?.[0]?.anlam;
    return meaning || "Anlam bulunamadı.";
  } catch (error) {
    console.error("Hata:", error);
    return "Anlam alınamadı.";
  }
}

export default useGetKelimeMeaningTdk;
*/