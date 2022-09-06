import Image from "next/image";
import { useState } from "react";
import TalkButton from "../components/TalkButton";

const Speak = () => {
  const [text, setText] = useState("");

  return (
    <section className="">
      <div className="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row">
        <div className="flex justify-center xl:w-1/2">
          <Image
            className="object-cover rounded-xl"
            src="/static/000-Text-to-Speech.png"
            layout="intrinsic"
            alt="text-to-speech"
            width={450}
            height={300}
          />
        </div>

        <div className="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 xl:text-4xl dark:text-white">
            Speak by Typing Service
          </h2>

          <p className="block max-w-2xl mt-4 text-xl text-gray-500 dark:text-gray-300">
            Type your text on the textbox and click on &quot;Talk&quot; to
            convert your text to speech.
          </p>
        </div>
      </div>

      <form className="max-w-xl mx-auto p-4">
        <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your text to speech
            </label>
            <textarea
              id="speak"
              rows="4"
              className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write what you wish for..."
              required=""
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center items-center py-2 px-3 border-t dark:border-gray-600">
            <TalkButton text={text} />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Speak;
