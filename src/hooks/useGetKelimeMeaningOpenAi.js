import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const useGetKelimeMeaning = async (kelime) => {

  try {

  const response = await client.responses.create({
      model: "gpt-5",
      input: `${kelime} anlamını, bir veya en fazla iki cümle ile açıkla.`
  });
  } catch (error) {
    console.error("Error fetching kelime meaning:", error);
    return null;
  }

  console.log(response.output_text);
};

export default useGetKelimeMeaning;

/*
useEffect(() => {
    if (mainKelime) {
      console.log("Kelimenin Anlamı:", useGetKelimeMeaning(Object.values(mainKelime).join("")));
    }
  }, [mainKelime]);
*/