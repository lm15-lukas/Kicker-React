import React from "react";

export default function Impressum() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-red-400">Legal Notice (Impressum)</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-2xl space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-200">Site Operator</h2>
          <p className="text-gray-300">
            Lukas Martinez-Gnüchtel<br />

            Germany
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-200">Contact</h2>
          <p className="text-gray-300">
            Email: [lukasmartinez869@gmail.com]<br />
        
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-200">Purpose of the Website</h2>
          <p className="text-gray-300">
            This web app helps organize football (kicker) tournaments. It is intended for private or small group use (friends, clubs, schools).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-200">Liability for Content</h2>
          <p className="text-gray-300">
            The content was created with care, but no guarantee is made for accuracy, completeness, or timeliness.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-200">Liability for Links</h2>
          <p className="text-gray-300">
            This site may contain external links. I have no influence on their content and assume no liability.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-200">Copyright</h2>
          <p className="text-gray-300">
            All content created by the operator is subject to German copyright law. Reuse requires written permission.
          </p>
        </section>
      </div>
    </div>
  );
}
