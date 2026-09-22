import React, { useRef, useState, useEffect } from"react";
import { Play, RotateCcw, Volume2, CheckCircle, Sparkles, Pencil } from"lucide-react";
import { playChineseAudio } from"../services/speechService";

interface StrokeWriterCanvasProps {
  character: string;
  pinyin?: string;
  sinoVietnamese?: string;
  strokeOrderGuide?: string[];
  onComplete?: () => void;
}

export const StrokeWriterCanvas: React.FC<StrokeWriterCanvasProps> = ({
  character,
  pinyin,
  sinoVietnamese,
  strokeOrderGuide = [],
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [brushColor, setBrushColor] = useState("#dc2626"); // Chinese red default
  const [brushWidth, setBrushWidth] = useState(8);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle ="#fffbeb"; // Warm rice paper background
    ctx.fillRect(0, 0, width, height);

    // Outer border
    ctx.strokeStyle ="#f87171";
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Inner 米-grid (Mi Zi Ge)
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle ="#fca5a5";
    ctx.lineWidth = 1;

    // Horizontal middle
    ctx.moveTo(4, height / 2);
    ctx.lineTo(width - 4, height / 2);

    // Vertical middle
    ctx.moveTo(width / 2, 4);
    ctx.lineTo(width / 2, height - 4);

    // Diagonal 1
    ctx.moveTo(4, 4);
    ctx.lineTo(width - 4, height - 4);

    // Diagonal 2
    ctx.moveTo(width - 4, 4);
    ctx.lineTo(4, height - 4);

    ctx.stroke();
    ctx.setLineDash([]); // Reset dash
  };

  const drawHintCharacter = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!showHint) return;
    ctx.save();
    ctx.font =`bold ${Math.floor(width * 0.65)}px"KaiTi","STKaiti","Biaukai","Noto Serif SC","SimSun", serif`;
    ctx.fillStyle ="rgba(220, 38, 38, 0.15)";
    ctx.textAlign ="center";
    ctx.textBaseline ="middle";
    ctx.fillText(character, width / 2, height / 2 + height * 0.05);
    ctx.restore();
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    drawGrid(ctx, width, height);
    drawHintCharacter(ctx, width, height);
    setStrokeCount(0);
    setCompleted(false);
  };

  useEffect(() => {
    initCanvas();
  }, [character, showHint]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX ="touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY ="touches" in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
    ctx.lineCap ="round";
    ctx.lineJoin ="round";
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX ="touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY ="touches" in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setStrokeCount((prev) => {
        const next = prev + 1;
        if (strokeOrderGuide.length > 0 && next >= strokeOrderGuide.length) {
          setCompleted(true);
          if (onComplete) onComplete();
        }
        return next;
      });
    }
  };

  const handleSpeak = async () => {
    setIsAudioPlaying(true);
    await playChineseAudio(character, 0.85);
    setIsAudioPlaying(false);
  };

  return (
    <div id="stroke-writer-container" className="flex flex-col items-center bg-white  rounded-2xl p-5 border border-stone-200  shadow-sm max-w-md mx-auto">
      {/* Header Info */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold font-serif text-red-600">
            {character}
          </span>
          {pinyin && (
            <span className="text-sm font-semibold text-stone-700  bg-red-50  px-2 py-0.5 rounded-full border border-red-200">
              {pinyin}
            </span>
          )}
          {sinoVietnamese && (
            <span className="text-xs text-stone-500">
              (Hán-Việt: {sinoVietnamese})
            </span>
          )}
        </div>

        <button
          id="btn-play-radical-audio"
          onClick={handleSpeak}
          disabled={isAudioPlaying}
          className="p-2 text-stone-600 hover:text-red-600   bg-stone-100  hover:bg-red-50  rounded-full transition"
          title="Nghe phát âm chuẩn"
        >
          <Volume2 className={`w-4 h-4 ${isAudioPlaying ?"animate-pulse text-red-600" :""}`} />
        </button>
      </div>

      {/* Canvas Frame with Rice-Paper 米字格 */}
      <div className="relative rounded-xl overflow-hidden border-2 border-red-200  shadow-inner bg-amber-50">
        <canvas
          id="radical-practice-canvas"
          ref={canvasRef}
          width={280}
          height={280}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair touch-none w-[280px] h-[280px]"
        />

        {completed && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Hoàn thành!</span>
          </div>
        )}
      </div>

      {/* Stroke Order Steps Guide */}
      {strokeOrderGuide.length > 0 && (
        <div className="w-full mt-4 bg-stone-50  rounded-xl p-3 border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-700  flex items-center gap-1.5">
              <Pencil className="w-3.5 h-3.5 text-red-500" />
              Thứ tự {strokeOrderGuide.length} nét viết chuẩn:
            </span>
            <span className="text-[11px] text-stone-500">
              Đã viết: {strokeCount} nét
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {strokeOrderGuide.map((guide, idx) => (
              <span
                key={idx}
                className={`text-xs px-2 py-0.5 rounded-md border transition-all ${
                  idx < strokeCount
                    ?"bg-red-100 text-red-800 border-red-300    font-medium"
                    :"bg-white  text-stone-600  border-stone-200"
                }`}
              >
                {idx + 1}. {guide}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-stone-100  gap-2">
        {/* Toggle Hint */}
        <button
          id="btn-toggle-hint"
          onClick={() => setShowHint(!showHint)}
          className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition flex items-center gap-1 ${
            showHint
              ?"bg-red-50 text-red-700 border-red-200"
              :"bg-stone-100 text-stone-600 border-stone-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {showHint ?"Ẩn nét mờ" :"Hiện nét mờ"}
        </button>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5">
          {["#dc2626","#2563eb","#16a34a","#1c1917"].map((color) => (
            <button
              key={color}
              onClick={() => setBrushColor(color)}
              className={`w-5 h-5 rounded-full transition-transform ${
                brushColor === color ?"scale-125 ring-2 ring-offset-1 ring-stone-400" :"opacity-80 hover:opacity-100"
              }`}
              style={{ backgroundColor: color }}
              title={`Màu mực ${color}`}
            />
          ))}
        </div>

        {/* Clear / Reset */}
        <button
          id="btn-reset-canvas"
          onClick={initCanvas}
          className="text-xs px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200   text-stone-700  border border-stone-200  font-medium transition flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Xóa viết lại
        </button>
      </div>
    </div>
  );
};
