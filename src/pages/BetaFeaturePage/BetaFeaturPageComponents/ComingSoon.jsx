import { Rocket } from "lucide-react"
export default function ComingSoon() {
    return (
        <>
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <Rocket className="w-16 h-16 text-yellow-400 mx-auto" />
                    <h1 className="text-5xl font-bold mb-4"> Coming Soon</h1>
                    <p className="text-lg text-gray-400">
                        This function will be available soon.
                    </p>
                </div>
            </div>
        </>
    )
}