import { doc, setDoc } from "firebase/firestore";
import { db } from '../index.js';

async function useSendToUs(suggestion) {
  try {
    const docRef = doc(db, "suggestions", `${Date.now()}`);
    await setDoc(docRef, { suggestion });
    console.log("Suggestions sent successfully!");
  } catch (error) {
    console.error("Error sending suggestions: ", error);
  }
}

export default useSendToUs;