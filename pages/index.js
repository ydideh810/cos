import { useState } from "react";
import Head from "next/head";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(500);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
  };

  return (
    
<div className="max-w-screen-md bg-white mx-auto m-10 p-10 rounded-lg border-2 border-red-700">
      <Head>
        <title>CosmoSpeak</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" />
     <link rel="icon" href="https://i.postimg.cc/28X3KLWt/circle.png" type="image/x-icon" />
      </Head>
     
      {showDialog && (
        <dialog
          className="fixed w-screen h-screen bg-black bg-opacity-50 inset-0 flex justify-center items-center z-50"
        >
          <article className="content-container bg-white p-8 overflow-y-scroll max-h-screen">
            <h4 className="mb-4">Welcome to CosmoSpeak</h4>

            <p className="mb-8">
              Explore the wonders of Space Engineering through A.I.
            </p>

            <ol className="list-decimal mx-6 pl-2 mb-8">
              <li>Get started w/ a free trial!</li>  
              
            </ol>
          
            <button
  className="p-3 px-6 bg-black text-red-700"
  onClick={() => {
    window.location.href = 'https://square.link/u/RmVSmy9L';
    return false;
  }}
>
  Start Today
</button>

          </article>
        </dialog>
      )} 
      

      <h1 className="text-3xl text-center p-10 text-red-700" style={{ fontFamily: 'Zen Dots' }}>
        COSMOSPEAK
      </h1>

      <form onSubmit={handleSubmit} className="flex text-red-700">
        <input
          type="text"
          name="prompt"
          placeholder="how do they put stuff into rockets?"
          className="flex-grow text-red-700"
        />
        <button type="submit" className="p-3 px-6 bg-black text-red-700">
          Go!
        </button>
      </form>

      {error && <div>{error}</div>}

      {prediction && (
        <div className="py-10">
          {prediction.output && <div>{prediction.output}</div>}
          <p className="text-sm opacity-50 pt-10">
            status: {prediction.status}
          </p>
        </div>
      )}
    </div>
  );
}
