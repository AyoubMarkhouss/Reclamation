import React, { useState } from "react";

const YourComponent = () => {
  const [pdfContent, setPdfContent] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Read the content of the selected PDF file
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setPdfContent(content);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = () => {
    // Handle the submit action, e.g., show the PDF content
    console.log("PDF Content:", pdfContent);
  };

  const handleDownload = () => {
    // Trigger the download of the PDF file
    const element = document.createElement("a");
    element.href = pdfContent;
    element.download = "downloaded_pdf.pdf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-orange-400">
      <div className="border p-4">
        <h1 className="text-center text-9xl font-bold">PDF</h1>
        <label htmlFor="pdfInput">Choose a PDF file:</label>
        <input
          type="file"
          id="pdfInput"
          accept=".pdf , .doc, .docx"
          onChange={handleFileChange}
        />
      </div>

      {/* <button onClick={handleSubmit}>Submit</button> */}

      {pdfContent && (
        <div className="flex">
          <button onClick={handleDownload}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
