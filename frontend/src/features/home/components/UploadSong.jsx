import { useState } from "react";
import { uploadSong } from "../services/song.api";

const moodOptions = [
  "happy",
  "sad",
  "angry",
  "calm",
  "fear",
  "surprised",
  "neutral",
];

const UploadSong = () => {
  const [mood, setMood] = useState("happy");
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!song) {
      setError("Please choose an MP3 file.");
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const uploadedSong = await uploadSong({ mood, song });
      const title = uploadedSong?.title || uploadedSong?.tittle || "Song";

      setMessage(`${title} uploaded successfully.`);
      setSong(null);
      event.target.reset();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" max-w-3xl rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-lg">
      <h2 className="text-lg font-semibold text-white">Upload New Song</h2>
      <p className="mt-1 text-sm text-slate-300">
        Choose mood and upload one MP3 file.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Mood
          <select
            value={mood}
            onChange={(event) => setMood(event.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-400"
          >
            {moodOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Song File (.mp3)
          <input
            type="file"
            accept="audio/mp3,audio/mpeg"
            onChange={(event) => setSong(event.target.files?.[0] || null)}
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white file:mr-3 file:rounded-md file:border-0 file:bg-emerald-400 file:px-3 file:py-1 file:text-black"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Song"}
        </button>
      </form>

      {message ? (
        <p className="mt-3 text-sm text-emerald-400">{message}</p>
      ) : null}
      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
    </section>
  );
};

export default UploadSong;
