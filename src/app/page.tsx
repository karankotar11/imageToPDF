import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 w-full min-h-screen flex justify-center items-center flex-col font-mono">
      <h1 className="text-3xl mb-4 text-center">
        Welcome to the PDF Converter
      </h1>
      <Link
        href="/convert-to-pdf"
        className="bg-blue-500 text-white py-2 px-4 rounded  "
      >
        Go to Convert Photos to PDF
      </Link>
    </div>
  );
}
