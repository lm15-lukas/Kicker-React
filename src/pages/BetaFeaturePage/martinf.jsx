import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import wirbel from './assets/images/thewirbler.jpg'

export default function Martinf() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/martinf");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <Rocket className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
        <h1 className="text-5xl font-bold mb-4">Who is Martin F.?</h1>
        <p className="text-lg text-gray-400 mb-2">
          Legend? Chaos? Mystery? One thing is certain: he loves to{" "}
          <span className="text-yellow-400 font-semibold">wirbeln</span>.
        </p>
        <div className="bg-gray-800 p-5 rounded-xl shadow-xl mt-8">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-300">
            Signature Moves
          </h2>
          <ul className="text-gray-300 text-left list-disc list-inside space-y-2">
            <li>
              <span className="text-white font-medium">Bug shots</span> – goals that defy physics
            </li>
            <li>
              <span className="text-white font-medium">Own goals</span> – accidental, or tactical genius?
            </li>
            <li>
              Overdoses of <span className="text-yellow-400">wirbeln</span> – every. single. match.
            </li>
          </ul>
        </div>

        {/* Placeholder image */}
        <div className="mt-8">
          <img
            src={wirbel}
            alt="Martin F. doing his thing"
            className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
