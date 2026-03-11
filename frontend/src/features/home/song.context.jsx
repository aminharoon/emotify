import { useState } from "react";
import { SongContext } from "./songContext";

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState();
  const [loading, setLoading] = useState(false);
  return (
    <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </SongContext.Provider>
  );
};
