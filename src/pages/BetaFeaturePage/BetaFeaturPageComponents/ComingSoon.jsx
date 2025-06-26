import { Rocket } from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
    const navigate = useNavigate();
    const handleMartinClick = () => {
        navigate("/martinf");
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <Rocket className="w-16 h-16 text-yellow-400 mx-auto" />
                <h1 className="text-5xl font-bold mb-4">Coming Soon</h1>
                <p className="text-lg text-gray-400">
                    This function will be available soon.
                </p>
                <p className="text-lg text-gray-400">
                    until this happens{" "}
                    <span
                        onClick={handleMartinClick}
                        className="text-yellow-400 hover:underline cursor-pointer"
                    >
                        Martin F.
                    </span>{" "}
                    needs to Wirbel less.
                </p>
            </div>
        </div>
    );
}
