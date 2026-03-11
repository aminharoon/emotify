import { useEffect, useMemo, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const PlayerContent = ({ song }) => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const title = useMemo(
    () => song?.title || song?.tittle || "Untitled Track",
    [song],
  );

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime || 0);
    const updateDuration = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleSeek = (event) => {
    const value = Number(event.target.value);
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const seekBy = (delta) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Math.min(
      Math.max(audio.currentTime + delta, 0),
      Number.isFinite(audio.duration)
        ? audio.duration
        : audio.currentTime + delta,
    );

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  if (!song) return null;
  return (
    <section className="mx-auto mt-10 w-full max-w-3xl rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-800 p-6 shadow-2xl">
      <audio ref={audioRef} src={song?.songUrl} preload="metadata" />

      <div className="grid gap-5 md:grid-cols-[140px_1fr]">
        <img
          src={song?.posterUrl}
          alt={title}
          className="h-36 w-36 rounded-xl object-cover shadow-lg"
        />

        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
              Now Playing
            </p>
            <h2 className="line-clamp-2 text-xl font-semibold text-white">
              {title}
            </h2>
            <p className="mt-1 text-sm text-emerald-300">
              Mood: {song?.mood || "neutral"}
            </p>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              disabled={!duration}
              style={{
                background: `linear-gradient(90deg, rgb(52 211 153) ${progressPercent}%, rgb(51 65 85) ${progressPercent}%)`,
              }}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => seekBy(-10)}
              className="rounded-full border border-slate-500 px-4 py-2 text-sm text-white transition-transform duration-200 hover:scale-105"
            >
              Back 10s
            </button>

            <button
              onClick={togglePlay}
              className="rounded-full bg-emerald-400 px-5 py-2 font-semibold text-black transition-transform duration-200 hover:scale-105"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            <button
              onClick={() => seekBy(10)}
              className="rounded-full border border-slate-500 px-4 py-2 text-sm text-white transition-transform duration-200 hover:scale-105"
            >
              Forward 10s
            </button>

            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className="rounded-full border border-slate-500 px-4 py-2 text-sm text-white"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300">Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="h-2 w-28 cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Player = () => {
  const { song } = useSong();

  if (!song) return null;

  return <PlayerContent key={song?.songUrl} song={song} />;
};

export default Player;
