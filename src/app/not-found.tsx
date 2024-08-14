import Link from "next/link";

export default function NotFound(){
    return(
        <>
            <div className="w-full min-h-screen flex flex-col justify-center items-center">

                <h1 className="text-2xl font-mono mb-5">Page Not Found</h1>
                <Link href={"/"} className="bg-blue-600 text-white py-2 px-3 rounded-lg">Go To Home</Link>

            </div>
        </>
    )
}