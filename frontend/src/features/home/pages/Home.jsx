import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import UploadSong from "../components/UploadSong";
import { useSong } from "../hooks/useSong";

const Home = () => {
  const { handleGetSong } = useSong();
  return (
    <>
      <div className="flex justify-between items-center  w-full">
        <FaceExpression
          onClick={(expression) => handleGetSong({ mood: expression })}
        />
        <UploadSong />
      </div>
      <Player />
    </>
  );
};

export default Home;
