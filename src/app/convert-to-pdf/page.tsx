"use client";
// pages/convert-to-pdf.tsx

import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";

const ConvertToPdf = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const VALID_IMAGE_EXTENSIONS = ["jpeg", "jpg", "heic", "png", "gif", "jfif"];

  const handleFileChange = () => {
    const input = inputRef.current;
    if (input && input.files) {
      const validFiles = Array.from(input.files).filter((file) => {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        return VALID_IMAGE_EXTENSIONS.includes(fileExtension || "");
      });

      const names = validFiles.map((file) => file.name);
      setFileNames(names);

      const previews: string[] = [];
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            previews.push(reader.result as string);
            if (previews.length === validFiles.length) {
              setFilePreviews(previews);
              setIsButtonEnabled(validFiles.length > 0);
            }
          }
        };
      });
    }
  };

  const handleConvertToPdf = () => {
    const pdf = new jsPDF();
    const input = inputRef.current;

    if (input && input.files) {
      Array.from(input.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          const image = new Image();
          image.src = reader.result as string;

          image.onload = function () {
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (image.height * imgWidth) / image.width;

            pdf.addImage(image, "JPEG", 0, 0, imgWidth, imgHeight);

            if (index < input.files!.length - 1) {
              pdf.addPage();
            }

            if (index === input.files!.length - 1) {
              pdf.save("phototopdfconverter.pdf");
            }
          };
        };
      });
    }
  };
  // //   console.log(fileNames)
  // console.log(filePreviews,'f p')
  // console.log(fileNames)

  return (
    <div className="flex justify-start mt-10 items-center min-h-screen w-full flex-col p-4 place-items-center">
      <h1 className="text-3xl font-mono mb-4">Convert Photos to PDF</h1>
      <div className="flex justify-center items-center text-center">
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          multiple
          className=" p-5  text-right ml-40 "
          onChange={handleFileChange}
        />
      </div>
      <button
        onClick={handleConvertToPdf}
        className="bg-green-500 text-white py-2 px-4 rounded disabled:bg-red-500"
        disabled={!isButtonEnabled}
      >
        Convert to PDF
      </button>

      {!isButtonEnabled && (
        <h1 className="mt-3 text-red-700 text-lg font-semibold">
          Select only 'jpeg', 'jpg', 'heic', 'png', 'gif' , 'jfif' file.
        </h1>
      )}
      <div className="mt-4">
        {/* <h2 className="text-xl">Selected Files:</h2>
        <ul>
          {fileNames.map((name, index) => (
            <li key={index} className="text-gray-700">
              {name}
            </li>
          ))}
        </ul> */}
        {
         filePreviews && filePreviews.length>0 && <div className="mt-4">
            <h2 className="text-xl text-center p-3">Image Previews:</h2>
            <div className="flex flex-wrap w-full place-items-center gap-2 justify-center items-center px-2">
              {filePreviews.map((preview, index) => (
                <div key={index} className="w-36 h-40 relative mb-3">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-black text-white text-xs p-1 w-full text-center">
                    {fileNames[index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ConvertToPdf;
