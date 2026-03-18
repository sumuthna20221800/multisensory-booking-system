/*import { Howl } from "howler";
import { useRef } from "react";

function SoundscapePlayer({ sound }) {
  const audio = useRef(
    new Howl({
      src: [sound],
      loop: true,
      volume: 0.4,
    })
  );

  return (
    <div>
      <button onClick={() => audio.current.play()}>Play Sound</button>
      <button onClick={() => audio.current.pause()}>Pause</button>
    </div>
  );
}

export default SoundscapePlayer;*/
import { Howl } from "howler";
import { useRef } from "react";

function SoundscapePlayer({ sound }) {
  const audio = useRef(new Howl({ src: [sound], loop: true, volume: 0.5 }));

  return (
    <div className="sound-player">
      <button className="btn-prm" onClick={() => audio.current.play()}>Play Sound</button>
      <button className="btn-prm" onClick={() => audio.current.pause()}>Pause Sound</button>
    </div>
  );
}

export default SoundscapePlayer;

