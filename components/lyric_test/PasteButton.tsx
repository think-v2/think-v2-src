type PasteButtonProps = {
  updateLyrics: (lyrics: string) => void;
};

const PasteButton = ({ updateLyrics }: PasteButtonProps) => {
  return (
    <button
      className="p-2 mt-5 bg-gray-900/50 outline-amber-50/60 outline-2 rounded-xl"
      onClick={async () => updateLyrics(await navigator.clipboard.readText())}
    >
      Paste Lyrics
    </button>
  );
};

export default PasteButton;
