// Draws the week overview onto a canvas and saves it as a PNG, so the plan
// can be kept on a phone or shared without opening the app.

const SCALE = 2; // draw at 2x so text stays sharp on retina screens
const WIDTH = 1200;
const PAD = 48;
const DAY_COL = 150;
const GAP = 10;
const CELL_PAD = 14;
const LINE = 20;
const MAX_LINES = 4; // per slot; anything beyond becomes "+n more"
const FONT = "Inter, system-ui, sans-serif";

const COLORS = {
  bg: "#0b0b0b",
  text: "#ffffff",
  muted: "#9c9c9c",
  faint: "#6e706b",
  head: "#777777",
  day: "#d6d6d6",
  green: "#5fd38a",
  filledBg: "rgba(95, 211, 138, 0.08)",
  filledBorder: "rgba(95, 211, 138, 0.4)",
  emptyBorder: "rgba(255, 255, 255, 0.14)",
};

// Breaks text into lines that fit maxWidth; a single over-long word is cut with "…"
const wrap = (ctx, text, maxWidth) => {
  const lines = [];
  let line = "";

  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth) {
      line = next;
      continue;
    }
    if (line) lines.push(line);
    line = word;
    while (ctx.measureText(line).width > maxWidth && line.length > 1) {
      line = line.slice(0, -1);
    }
    if (line !== word) line = `${line.slice(0, -1)}…`;
  }
  if (line) lines.push(line);
  return lines;
};

// Lines shown in one slot: every recipe title, wrapped, capped at MAX_LINES
const slotLines = (ctx, recipes, maxWidth) => {
  if (!recipes.length) return [{ text: "—", muted: true }];

  const lines = [];
  for (let i = 0; i < recipes.length; i++) {
    const titleLines = wrap(ctx, recipes[i].title || "Untitled", maxWidth);
    if (lines.length + titleLines.length > MAX_LINES - (i < recipes.length - 1 ? 1 : 0)) {
      lines.push({ text: `+${recipes.length - i} more`, extra: true });
      break;
    }
    titleLines.forEach((text) => lines.push({ text }));
  }
  return lines;
};

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

export const drawWeekImage = ({ planner, days, meals, summary }) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported");

  const colWidth = (WIDTH - PAD * 2 - DAY_COL - GAP * meals.length) / meals.length;
  const textWidth = colWidth - CELL_PAD * 2;

  // Work out every slot's lines first so each row can be as tall as it needs
  ctx.font = `14px ${FONT}`;
  const rows = days.map((day) =>
    meals.map((meal) => slotLines(ctx, planner?.[day.toLowerCase()]?.[meal.toLowerCase()] || [], textWidth))
  );
  const rowHeights = rows.map((cells) => Math.max(...cells.map((l) => l.length)) * LINE + CELL_PAD * 2);

  const headerHeight = 130;
  const height = headerHeight + 30 + rowHeights.reduce((a, b) => a + b + GAP, 0) + PAD;

  canvas.width = WIDTH * SCALE;
  canvas.height = height * SCALE;
  ctx.scale(SCALE, SCALE);
  ctx.textBaseline = "top";

  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, WIDTH, height);

  ctx.fillStyle = COLORS.text;
  ctx.font = `600 30px ${FONT}`;
  ctx.fillText("My week plan", PAD, PAD);

  ctx.fillStyle = COLORS.muted;
  ctx.font = `15px ${FONT}`;
  ctx.fillText(summary, PAD, PAD + 44);

  // Column headers
  let y = headerHeight;
  ctx.fillStyle = COLORS.head;
  ctx.font = `600 11px ${FONT}`;
  meals.forEach((meal, i) => {
    ctx.fillText(meal.toUpperCase(), PAD + DAY_COL + GAP + i * (colWidth + GAP) + 4, y);
  });
  y += 30;

  days.forEach((day, r) => {
    const h = rowHeights[r];

    ctx.fillStyle = COLORS.day;
    ctx.font = `500 15px ${FONT}`;
    ctx.fillText(day, PAD, y + CELL_PAD);

    rows[r].forEach((lines, c) => {
      const x = PAD + DAY_COL + GAP + c * (colWidth + GAP);
      const filled = !lines[0].muted;

      roundRect(ctx, x, y, colWidth, h, 8);
      if (filled) {
        ctx.fillStyle = COLORS.filledBg;
        ctx.fill();
      }
      ctx.strokeStyle = filled ? COLORS.filledBorder : COLORS.emptyBorder;
      ctx.setLineDash(filled ? [] : [4, 4]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = `14px ${FONT}`;
      lines.forEach((line, i) => {
        ctx.fillStyle = line.extra ? COLORS.green : line.muted ? COLORS.faint : COLORS.text;
        ctx.fillText(line.text, x + CELL_PAD, y + CELL_PAD + i * LINE);
      });
    });

    y += h + GAP;
  });

  return canvas;
};

export const saveWeekImage = (options) =>
  new Promise((resolve, reject) => {
    const canvas = drawWeekImage(options);
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("Could not create the image"));

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `week-plan-${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve();
    }, "image/png");
  });
