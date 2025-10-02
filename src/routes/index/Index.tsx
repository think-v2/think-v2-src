import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="">
      <h1 className="text-7xl m-10">
        <b>think-v2</b>
      </h1>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-8 max-w-5xl place-items-center">
        <Link to="/LyricTest">
          <div
            className="flex items-center justify-center
          scale-100 hover:scale-110 transition-all
          outline-4 outline-gray-500 text-3xl w-80 h-40 rounded-2xl bg-gray-200 text-black"
          >
            🎵 Lyric Test 🎵
          </div>
        </Link>
        <Link to="/">
          <div
            className="flex items-center justify-center
          scale-100 hover:scale-110 transition-all
          outline-4 outline-gray-500 text-3xl w-80 h-40 rounded-2xl bg-gray-200 text-black"
          >
            {" "}
            TBD
          </div>
        </Link>
        <Link to="/">
          <div
            className="flex items-center justify-center
          scale-100 hover:scale-110 transition-all
          outline-4 outline-gray-500 text-3xl w-80 h-40 rounded-2xl bg-gray-200 text-black"
          >
            {" "}
            TBD
          </div>
        </Link>
        <Link to="/">
          <div
            className="flex items-center justify-center
          scale-100 hover:scale-110 transition-all
          outline-4 outline-gray-500 text-3xl w-80 h-40 rounded-2xl bg-gray-200 text-black"
          >
            {" "}
            TBD
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Index;
