import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from "../helpers/imageHelper";

const FoodwithImage = () => {
  // Access your API key as an environment variable (see "Set up your API key" above)
  // require("dotenv").config();
  const genAI = new GoogleGenerativeAI(
    "AIzaSyA-mXo6KJ6x00kHWPey41x_Yu2txm52GhA"
  );

  const [image, setImage] = useState("");
  const [imageInineData, setImageInlineData] = useState("");
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Generative AI Call to fetch image insights
   */
  async function aiImageRun() {
    setLoading(true);
    setResponse("");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-exp-0801",
    });
    const result = await model.generateContent([
      "Tell me the estimated number of calories, protein, and sugar in the image?. Give answer in following format 'Calories: x , Protein: y , Sugar: z'. ONLY DISPLAY THIS FORMATTED DATA. If you idenitify food, just give a rough estimate even if the food nutrition recognition varies from food to food. If you can't recognise the image as any food, then simply say 'Can't recognise'.",
      imageInineData,
    ]);
    const response = await result.response;
    const text = response.text();
    setResponse(text);
    setLoading(false);
  }

  const handleClick = () => {
    aiImageRun();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // getting base64 from file to render in DOM
    getBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch((e) => console.log(e));

    // generating content model for Gemini Google AI
    fileToGenerativePart(file).then((image) => {
      setImageInlineData(image);
    });
  };

  // Converts a File object to a GoogleGenerativeAI.Part object.
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  return (
    <div>
      <div>
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <input
            type="file"
            onChange={(e) => handleImageChange(e)}
            className="border border-gray-300 p-2 rounded mb-2 sm:mb-0 sm:mr-4"
          />
          <button
            onClick={() => handleClick()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Estimate Nutrition
          </button>
        </div>
        <img src={image} style={{ width: "30%", marginTop: 30 }} />
      </div>

      {loading == true && aiResponse == "" ? (
        <p style={{ margin: "30px 0" }}>Loading ...</p>
      ) : (
        <div style={{ margin: "30px 0" }}>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default FoodwithImage;
