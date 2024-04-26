'use client';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

// Create Document Component
const CorrespondentDocument = ({ correspondenceFile }: any) => {
  const [numPages, setNumPages] = useState<number>();
  // const [pageNumber, setPageNumber] = useState<number>(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // console.log('correspondenceFile', correspondenceFile);

  return (
    <div
      // initial={{
      //   x: 200,
      //   opacity: 0,
      // }}
      // whileInView={{
      //   opacity: 1,
      //   x: 0,
      // }}
      // transition={{
      //   duration: 0.5,
      //   ease: 'easeInOut',
      // }}
      className="relative w-full overflow-auto"
    >
      <Document
        file={correspondenceFile[0]}
        onLoadSuccess={onDocumentLoadSuccess}
        className="w-full rounded-lg"
      >
        {Array.from(
          { length: numPages !== undefined ? numPages : 0 },
          (_, i) => (
            <div
              key={i + 1}
              className="flex w-full flex-col items-end gap-3 p-5"
            >
              <Page
                pageNumber={i + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="rounded-sm"
              />
              <p className="pt-[-10px] text-[#666666]">Page {i + 1}</p>
            </div>
          )
        )}
      </Document>
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </div>
  );
};

export default CorrespondentDocument;
