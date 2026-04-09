"""
Ensotek — Kapalı Devre Soğutma Kulesi "Nasıl Çalışır" GIF
Referans: ensotek-closed-circuit-water-cooling-tower-operation-principle-how-works_2.gif
Tema: void/deep dark + cyan (site palette)
"""
from PIL import Image, ImageDraw, ImageFont
import math, os

W, H = 960, 540

# ─── Colors (site palette) ───────────────────────────────────────────────────
BG      = (  6,  10,  15)   # --void
DEEP    = ( 10,  16,  24)   # --deep
PANEL_C = ( 18,  30,  43)   # --panel
STEEL   = ( 26,  42,  56)   # --steel
BORDER  = (  0,  50,  60)
CYAN    = (  0, 188, 212)   # --cyan
CYAN_G  = ( 38, 217, 237)   # --cyan-glow
CYAN_D  = (  0,  97, 107)   # --cyan-dim
WHITE   = (240, 244, 248)
MIST    = (160, 176, 192)
SILVER  = (122, 138, 154)
HOT     = (220,  55,  15)   # sıcak proses suyu
WARM    = (255, 140,  50)   # geçiş
COLD    = ( 41, 182, 246)   # soğuk proses suyu
SPRAY_C = ( 80, 160, 210)   # sprey suyu
SPRAY_D = ( 40, 110, 150)
AIR_C   = ( 60, 155, 120)   # hava
STEAM_C = (200, 240, 255)   # buhar

# ─── Fonts ───────────────────────────────────────────────────────────────────
FONT_DIR = "/usr/share/fonts/truetype/liberation"
def fnt(size, bold=False):
    n = f"LiberationSansNarrow-{'Bold' if bold else 'Regular'}.ttf"
    p = f"{FONT_DIR}/{n}"
    if not os.path.exists(p):
        p = f"{FONT_DIR}/LiberationSans-{'Bold' if bold else 'Regular'}.ttf"
    try:
        return ImageFont.truetype(p, size)
    except:
        return ImageFont.load_default()

F_STEP  = fnt(56, bold=True)
F_TITLE = fnt(20, bold=True)
F_BODY  = fnt(14)
F_LABEL = fnt(10, bold=True)
F_SMALL = fnt(9)
F_TINY  = fnt(8)

# ─── Tower geometry ──────────────────────────────────────────────────────────
HDR   = 42          # header bar height
TX    = 155         # tower left  (process connections fit left of this)
TY    = HDR + 8     # tower top
TW    = 290         # tower width
TH    = 446         # tower height
TR    = TX + TW     # 445
TB    = TY + TH     # 496

# Tower zones
FAN_TOP   = TY
FAN_BOT   = TY + 44
DRIFT_TOP = FAN_BOT
DRIFT_BOT = DRIFT_TOP + 14
DISTR_TOP = DRIFT_BOT
DISTR_BOT = DISTR_TOP + 26
COIL_TOP  = DISTR_BOT          # 136
COIL_BOT  = TB - 56            # ~440
BASIN_TOP = COIL_BOT
BASIN_BOT = TB

# Air inlet cutouts (both sides)
AIR_W   = 44
AIR_TOP = COIL_TOP + 55
AIR_BOT = COIL_BOT - 32

# Coil (serpantin) inner bounds
CX0 = TX + AIR_W + 10          # 209
CX1 = TR - AIR_W - 10          # 391
CW  = CX1 - CX0                # 182

# Pipe rows
N_PIPES = 6
PIPE_R  = 7       # half-height of pipe oval
_avail  = COIL_BOT - COIL_TOP - 28
_step   = _avail // (N_PIPES + 1)
pipe_ys = [COIL_TOP + 14 + _step * (i + 1) for i in range(N_PIPES)]
# pipe_ys[0] ≈ entry (top), pipe_ys[-1] ≈ exit (bottom)

# Process connections (left side, outside tower)
PROC_X0   = TX - 80    # 75
PROC_IN_Y  = pipe_ys[0]
PROC_OUT_Y = pipe_ys[-1]
PROC_BOX_X = 10
PROC_BOX_W = 58
PROC_MID_Y = (PROC_IN_Y + PROC_OUT_Y) // 2

# Water inlet (right side, feeds Water Distribution)
WIN_X0 = TR
WIN_X1 = TR + 28
WIN_Y  = DISTR_TOP + 10

# Recirculation pump (bottom right, basin → water distribution)
RPUMP_X = TR + 22
RPUMP_Y = BASIN_TOP + 22

# Info panel
PX  = TR + 62
PY  = TY
PW  = W - PX - 16
PH  = TH

# ─── Steps data (TR / EN) ────────────────────────────────────────────────────
STEPS_TR = [
    {
        "num": "01",
        "title": "Sıcak Su Girişi",
        "body": (
            "Prosesten dönen sıcak su,\n"
            "pompa yardımıyla serpantinin\n"
            "üst girişinden beslenir."
        ),
        "color": HOT,
    },
    {
        "num": "02",
        "title": "Hava ile Temas",
        "body": (
            "Taze hava her iki yandan içeri\n"
            "girer. Su dağıtım sistemi sprey\n"
            "suyunu serpantin üzerine döker."
        ),
        "color": AIR_C,
    },
    {
        "num": "03",
        "title": "Evaporatif Soğutma",
        "body": (
            "Sprey suyu buharlaşarak büyük\n"
            "ısı enerjisini atmosfere taşır.\n"
            "Fan egzost havasını dışarı atar."
        ),
        "color": STEAM_C,
    },
    {
        "num": "04",
        "title": "Soğutulmuş Su",
        "body": (
            "Soğuyan proses suyu serpantin\n"
            "altından çıkarak prosese döner.\n"
            "Sprey suyu havuzdan geri döner."
        ),
        "color": COLD,
    },
]

STEPS_EN = [
    {
        "num": "01",
        "title": "Hot Water Inlet",
        "body": (
            "Hot process fluid returning from\n"
            "the system is pumped into the\n"
            "top of the coil."
        ),
        "color": HOT,
    },
    {
        "num": "02",
        "title": "Air Contact",
        "body": (
            "Fresh air enters from both sides.\n"
            "The distribution system sprays\n"
            "water over the coil surface."
        ),
        "color": AIR_C,
    },
    {
        "num": "03",
        "title": "Evaporative Cooling",
        "body": (
            "Spray water evaporates, carrying\n"
            "large amounts of heat energy\n"
            "into the atmosphere via the fan."
        ),
        "color": STEAM_C,
    },
    {
        "num": "04",
        "title": "Cooled Water",
        "body": (
            "The cooled process fluid exits\n"
            "the coil and returns to the system.\n"
            "Spray water recirculates from basin."
        ),
        "color": COLD,
    },
]

LABELS = {
    "tr": {
        "header":  "KAPALI DEVRE SOĞUTMA KULESİ — ÇALIŞMA PRENSİBİ",
        "badge":   "◈  KAPALI DEVRE / CLOSED CIRCUIT",
        "pump":    "Pompa",
        "basin":   "SOĞUK SU HAVUZU",
        "coil":    "SERPANTİN (Coil)",
        "frp":     "FRP Gövde",
        "exhaust": "▲  Sıcak-Doygun Egzost Havası  ▲",
        "air":     "Taze\nHava\nGirişi",
        "distrib": "Su Dağıtımı",
        "process": "PROSES",
        "makeup":  "Make Up",
    },
    "en": {
        "header":  "CLOSED CIRCUIT COOLING TOWER — OPERATING PRINCIPLE",
        "badge":   "◈  CLOSED CIRCUIT / KAPALI DEVRE",
        "pump":    "Pump",
        "basin":   "COLD WATER BASIN",
        "coil":    "COIL (Serpantine)",
        "frp":     "FRP Body",
        "exhaust": "▲  Hot Saturated Discharge Air  ▲",
        "air":     "Fresh\nAir\nInlet",
        "distrib": "Water Dist.",
        "process": "PROCESS",
        "makeup":  "Make Up",
    },
}

# Active language (set by CLI arg in main())
LANG  = "tr"
STEPS = STEPS_TR
LBL   = LABELS["tr"]

# ─── Helpers ─────────────────────────────────────────────────────────────────
def blend(c1, c2, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))

def eio(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)

def pulse(t, freq=1.0):
    return 0.5 + 0.5 * math.sin(t * freq * math.pi * 2)

def arrow(draw, x0, y0, x1, y1, color, w=2, hs=7):
    """Draw a line with arrowhead at (x1,y1)."""
    draw.line([(x0, y0), (x1, y1)], fill=color, width=w)
    angle = math.atan2(y1 - y0, x1 - x0)
    for da in (0.45, -0.45):
        ax = x1 - hs * math.cos(angle - da)
        ay = y1 - hs * math.sin(angle - da)
        draw.line([(x1, y1), (int(ax), int(ay))], fill=color, width=w)

# ─── Coil drawing ────────────────────────────────────────────────────────────
def draw_coil(draw, fill_frac=1.0, fluid=HOT):
    """
    Draw N_PIPES horizontal pipe ovals (serpantin cross-section).
    fill_frac 0..1: how much of the coil is filled with fluid color.
    Connector direction alternates: even rows connect on right, odd on left.
    """
    for i, py in enumerate(pipe_ys):
        # Background oval
        draw.ellipse([CX0, py - PIPE_R, CX1, py + PIPE_R],
                     fill=(14, 24, 34), outline=(30, 52, 68), width=1)

        # Fluid fill inside pipe
        pipe_frac = max(0.0, min(1.0, fill_frac * N_PIPES - i))
        if pipe_frac > 0:
            if i % 2 == 0:
                # flows L→R
                fx1 = int(CX0 + (CX1 - CX0) * pipe_frac)
                fx1 = max(CX0 + 2, fx1)
                draw.ellipse([CX0 + 1, py - PIPE_R + 2,
                               fx1,    py + PIPE_R - 2], fill=fluid)
            else:
                # flows R→L
                fx0 = int(CX1 - (CX1 - CX0) * pipe_frac)
                fx0 = min(CX1 - 2, fx0)
                draw.ellipse([fx0,     py - PIPE_R + 2,
                               CX1 - 1, py + PIPE_R - 2], fill=fluid)

        # Pipe outline (on top of fill)
        draw.ellipse([CX0, py - PIPE_R, CX1, py + PIPE_R],
                     outline=(42, 72, 90), width=1)

        # Vertical connector to next pipe
        if i < N_PIPES - 1:
            y_next = pipe_ys[i + 1]
            cy0 = py + PIPE_R
            cy1 = y_next - PIPE_R
            if i % 2 == 0:
                cx = CX1 - 10          # right side connector
            else:
                cx = CX0 + 10          # left side connector
            # background
            draw.rectangle([cx - 5, cy0, cx + 5, cy1],
                            fill=(14, 24, 34), outline=(30, 52, 68), width=1)
            # fluid in connector
            conn_threshold = (i + 0.88) / N_PIPES
            if fill_frac > conn_threshold:
                conn_frac = min(1.0, (fill_frac - conn_threshold) / (0.12 / N_PIPES))
                cy_fill = int(cy0 + (cy1 - cy0) * conn_frac)
                if cy_fill > cy0:
                    draw.rectangle([cx - 4, cy0, cx + 4, cy_fill], fill=fluid)
            draw.rectangle([cx - 5, cy0, cx + 5, cy1],
                            outline=(42, 72, 90), width=1)

    # Entry stub (top-left of first pipe)
    stub_x = CX0 + 10
    draw.rectangle([stub_x - 5, COIL_TOP + 4,
                    stub_x + 5, pipe_ys[0] - PIPE_R],
                   fill=(14, 24, 34), outline=(30, 52, 68), width=1)
    if fill_frac > 0:
        ef = min(1.0, fill_frac * N_PIPES * 3)
        ey = int((COIL_TOP + 4) + (pipe_ys[0] - PIPE_R - COIL_TOP - 4) * ef)
        if ey > COIL_TOP + 4:
            draw.rectangle([stub_x - 4, COIL_TOP + 4,
                             stub_x + 4, ey], fill=fluid)
    draw.rectangle([stub_x - 5, COIL_TOP + 4,
                    stub_x + 5, pipe_ys[0] - PIPE_R],
                   outline=(42, 72, 90), width=1)

    # Exit stub (bottom-left of last pipe, because N_PIPES-1 is odd → connector left)
    last_odd = (N_PIPES - 1) % 2 == 1  # True: last connector is left → exit is left
    exit_cx = CX0 + 10 if last_odd else CX1 - 10
    draw.rectangle([exit_cx - 5, pipe_ys[-1] + PIPE_R,
                    exit_cx + 5, COIL_BOT - 6],
                   fill=(14, 24, 34), outline=(30, 52, 68), width=1)
    if fill_frac >= 1.0:
        draw.rectangle([exit_cx - 4, pipe_ys[-1] + PIPE_R,
                        exit_cx + 4, COIL_BOT - 6], fill=fluid)
    draw.rectangle([exit_cx - 5, pipe_ys[-1] + PIPE_R,
                    exit_cx + 5, COIL_BOT - 6],
                   outline=(42, 72, 90), width=1)

# ─── Static tower structure ───────────────────────────────────────────────────
def draw_tower_static(draw):
    # ── Main body ──
    draw.rectangle([TX, TY, TR, TB], fill=DEEP, outline=CYAN_D, width=2)

    # ── Fan zone ──
    fc_x = TX + TW // 2
    fc_y = (FAN_TOP + FAN_BOT) // 2
    draw.rectangle([TX + 2, FAN_TOP + 2, TR - 2, FAN_BOT], fill=PANEL_C)
    draw.ellipse([fc_x - 34, fc_y - 18, fc_x + 34, fc_y + 18],
                 fill=(12, 20, 30), outline=CYAN_D, width=2)
    for deg in range(0, 360, 60):
        a = math.radians(deg)
        bx = fc_x + int(30 * math.cos(a))
        by = fc_y + int(15 * math.sin(a))
        draw.line([(fc_x, fc_y), (bx, by)], fill=CYAN_D, width=2)
    draw.ellipse([fc_x - 4, fc_y - 4, fc_x + 4, fc_y + 4], fill=CYAN_D)
    # "FAN" label
    draw.text((fc_x, fc_y), "FAN", fill=SILVER, font=F_SMALL, anchor="mm")

    # Hot exhaust label (above tower)
    draw.text((fc_x, TY - 10), LBL["exhaust"],
              fill=(140, 80, 40), font=F_TINY, anchor="mm")

    # ── Drift Eliminator ──
    draw.rectangle([TX + 2, DRIFT_TOP, TR - 2, DRIFT_BOT],
                   fill=(16, 28, 40), outline=(30, 50, 65), width=1)
    for dx in range(TX + 10, TR - 8, 16):
        draw.line([(dx, DRIFT_TOP + 2), (dx + 6, DRIFT_BOT - 2)],
                  fill=(35, 60, 78), width=2)
    draw.text((TR + 6, (DRIFT_TOP + DRIFT_BOT) // 2),
              "Drift Eliminator", fill=SILVER, font=F_TINY, anchor="lm")

    # ── Water Distribution (spray nozzles) ──
    draw.rectangle([TX + 2, DISTR_TOP, TR - 2, DISTR_BOT],
                   fill=(12, 22, 32))
    for nx in range(CX0 + 16, CX1 - 8, 32):
        draw.ellipse([nx - 4, DISTR_TOP + 4, nx + 4, DISTR_TOP + 12],
                     fill=SPRAY_C, outline=(55, 130, 175), width=1)
        draw.line([(nx, DISTR_TOP + 12), (nx, DISTR_BOT - 3)],
                  fill=SPRAY_C, width=1)
    draw.text((TX + TW // 2, DISTR_TOP + 2),
              LBL["distrib"], fill=(55, 120, 160), font=F_TINY, anchor="lm")

    # Water Inlet pipe (right, feeds distribution)
    draw.rectangle([WIN_X0, WIN_Y - 6, WIN_X1, WIN_Y + 6],
                   fill=SPRAY_D, outline=(55, 120, 155), width=1)
    draw.text((WIN_X1 + 5, WIN_Y), "Water\nInlet", fill=SILVER, font=F_TINY, anchor="lm")

    # ── Coil zone background ──
    draw.rectangle([CX0 - 2, COIL_TOP, CX1 + 2, COIL_BOT],
                   fill=(11, 19, 29))

    # ── Air inlet openings ──
    for is_left in (True, False):
        if is_left:
            x0, x1 = TX + 2, TX + AIR_W
        else:
            x0, x1 = TR - AIR_W, TR - 2
        draw.rectangle([x0, AIR_TOP, x1, AIR_BOT],
                       fill=PANEL_C, outline=BORDER, width=1)
        cx, cy = (x0 + x1) // 2, (AIR_TOP + AIR_BOT) // 2
        draw.text((cx, cy), LBL["air"],
                  fill=(45, 85, 75), font=F_TINY, anchor="mm", align="center")

    # ── Basin ──
    draw.rectangle([TX + 2, BASIN_TOP, TR - 2, BASIN_BOT],
                   fill=(8, 16, 26))
    draw.rectangle([TX + 4, BASIN_TOP + 20, TR - 4, BASIN_BOT - 3],
                   fill=(12, 26, 42), outline=CYAN_D, width=1)
    draw.text((TX + TW // 2, (BASIN_TOP + BASIN_BOT) // 2 + 10),
              LBL["basin"], fill=(38, 90, 110), font=F_TINY, anchor="mm")
    # Make-up water
    draw.rectangle([TX - 20, BASIN_TOP + 22, TX + 2, BASIN_TOP + 30],
                   fill=SPRAY_D, outline=(45, 110, 148), width=1)
    draw.text((TX - 23, BASIN_TOP + 26), LBL["makeup"], fill=SILVER, font=F_TINY, anchor="rm")

    # ── Process connections (left side) ──
    # Hot pipe: PROC_X0 → TX (entry to coil)
    draw.rectangle([PROC_X0, PROC_IN_Y - 5, TX, PROC_IN_Y + 5],
                   fill=HOT, outline=(170, 45, 8), width=1)
    # Cold pipe: TX → PROC_X0 (exit from coil)
    draw.rectangle([PROC_X0, PROC_OUT_Y - 5, TX, PROC_OUT_Y + 5],
                   fill=COLD, outline=(28, 140, 200), width=1)
    # Vertical connectors to PROCESS box
    draw.line([(PROC_BOX_X + PROC_BOX_W, PROC_IN_Y),
               (PROC_X0, PROC_IN_Y)], fill=HOT, width=2)
    draw.line([(PROC_BOX_X + PROC_BOX_W, PROC_OUT_Y),
               (PROC_X0, PROC_OUT_Y)], fill=COLD, width=2)
    draw.line([(PROC_BOX_X + PROC_BOX_W, PROC_IN_Y),
               (PROC_BOX_X + PROC_BOX_W, PROC_OUT_Y)], fill=STEEL, width=2)
    # PROCESS box
    bx0 = PROC_BOX_X
    bx1 = PROC_BOX_X + PROC_BOX_W
    by0 = PROC_MID_Y - 22
    by1 = PROC_MID_Y + 22
    draw.rectangle([bx0, by0, bx1, by1], fill=PANEL_C, outline=CYAN_D, width=1)
    draw.text(((bx0 + bx1) // 2, PROC_MID_Y),
              LBL["process"], fill=CYAN, font=F_LABEL, anchor="mm")
    # Pump symbol on hot-side pipe
    pump_x = (PROC_X0 + PROC_BOX_X + PROC_BOX_W) // 2
    pump_y = PROC_IN_Y
    draw.ellipse([pump_x - 9, pump_y - 9, pump_x + 9, pump_y + 9],
                 fill=STEEL, outline=CYAN_D, width=1)
    draw.polygon([(pump_x, pump_y - 6),
                  (pump_x + 5, pump_y + 3),
                  (pump_x - 5, pump_y + 3)],
                 fill=CYAN_D)

    # Labels
    draw.text((TX + 6, COIL_TOP + 20), LBL["frp"],
              fill=(35, 65, 82), font=F_TINY, anchor="lm")
    draw.text((TX + TW // 2, COIL_TOP + 8), LBL["coil"],
              fill=(35, 65, 82), font=F_TINY, anchor="mm")

# ─── Step animations ──────────────────────────────────────────────────────────
def draw_step01(draw, sub_t):
    """Sıcak su girişi — coil dolmaya başlar."""
    fill = eio(min(1.0, sub_t * 1.8))
    draw_coil(draw, fill_frac=fill, fluid=HOT)

    # Pulsing arrow on hot inlet pipe
    t_p = pulse(sub_t, 2.5)
    col = blend(HOT, WARM, t_p)
    arrow(draw, PROC_X0 - 2, PROC_IN_Y, TX + 2, PROC_IN_Y, col, w=3)

    # Moving drop along inlet pipe
    drop_t = (sub_t * 2.2) % 1.0
    drop_x = int(PROC_X0 + (TX - PROC_X0) * drop_t)
    draw.ellipse([drop_x - 4, PROC_IN_Y - 4, drop_x + 4, PROC_IN_Y + 4], fill=WARM)


def draw_step02(draw, sub_t):
    """Hava girişi + sprey suyu."""
    # Coil full of warm (transitioning) water
    draw_coil(draw, fill_frac=1.0, fluid=WARM)

    # Air arrows — left side
    n = 4
    for i in range(n):
        t_off = (sub_t + i / n) % 1.0
        ay = AIR_TOP + int((AIR_BOT - AIR_TOP) * (i / (n - 1)))
        ax0 = TX + 4
        ax1 = TX + AIR_W + 38
        ax  = int(ax0 + (ax1 - ax0) * t_off)
        alpha = max(0.0, 1.0 - abs(t_off - 0.5) * 2.2)
        col = blend(PANEL_C, AIR_C, alpha)
        draw.line([(ax0, ay), (ax, ay)], fill=col, width=2)
        if ax < ax1 - 6:
            draw.polygon([(ax, ay - 4), (ax + 8, ay), (ax, ay + 4)], fill=col)

    # Air arrows — right side
    for i in range(n):
        t_off = (sub_t + i / n) % 1.0
        ay = AIR_TOP + int((AIR_BOT - AIR_TOP) * (i / (n - 1)))
        ax0 = TR - 4
        ax1 = TR - AIR_W - 38
        ax  = int(ax0 - (ax0 - ax1) * t_off)
        alpha = max(0.0, 1.0 - abs(t_off - 0.5) * 2.2)
        col = blend(PANEL_C, AIR_C, alpha)
        draw.line([(ax, ay), (ax0, ay)], fill=col, width=2)
        if ax > ax1 + 6:
            draw.polygon([(ax, ay - 4), (ax - 8, ay), (ax, ay + 4)], fill=col)

    # Spray droplets from nozzles
    n_drops = 14
    for i in range(n_drops):
        t_off = (sub_t * 1.6 + i / n_drops) % 1.0
        dx = CX0 + int(CW * (i / (n_drops - 1)))
        dy = DISTR_BOT + int((COIL_BOT - DISTR_BOT - 12) * t_off)
        alpha = max(0.0, 1.0 - t_off * 1.2)
        col = blend(PANEL_C, SPRAY_C, alpha)
        r = 3 if t_off < 0.4 else 2
        draw.ellipse([dx - r, dy - r, dx + r, dy + r], fill=col)

    # Water inlet flow arrow
    t_p = pulse(sub_t, 3)
    col = blend(SPRAY_D, SPRAY_C, t_p)
    arrow(draw, WIN_X1 - 2, WIN_Y, TX + 4, WIN_Y, col, w=2)


def draw_step03(draw, sub_t):
    """Evaporatif soğutma — buhar + dönen fan."""
    fluid = blend(HOT, COLD, 0.45)
    draw_coil(draw, fill_frac=1.0, fluid=fluid)

    # Steam wisps rising through coil zone
    n_wisps = 10
    for i in range(n_wisps):
        t_off = (sub_t * 0.75 + i / n_wisps) % 1.0
        wx = CX0 + 15 + int((CW - 30) * (i / (n_wisps - 1)))
        wy = int(COIL_BOT - 15 - (COIL_BOT - FAN_BOT - 10) * t_off)
        alpha = max(0.0, math.sin(t_off * math.pi) * 0.75)
        col = blend(DEEP, STEAM_C, alpha)
        r = max(2, int(3 + 8 * t_off))
        draw.ellipse([wx - r, wy - r, wx + r, wy + r], fill=col)

    # Animated fan blades (spinning)
    fan_angle = sub_t * 360 * 3
    fc_x = TX + TW // 2
    fc_y = (FAN_TOP + FAN_BOT) // 2
    draw.ellipse([fc_x - 34, fc_y - 18, fc_x + 34, fc_y + 18],
                 fill=(12, 20, 30), outline=CYAN_D, width=2)
    for deg in range(0, 360, 60):
        a = math.radians(deg + fan_angle)
        bx = fc_x + int(30 * math.cos(a))
        by = fc_y + int(15 * math.sin(a))
        draw.line([(fc_x, fc_y), (bx, by)], fill=CYAN, width=2)
    draw.ellipse([fc_x - 4, fc_y - 4, fc_x + 4, fc_y + 4], fill=CYAN)

    # Hot exhaust arrows above tower
    for i in range(5):
        t_off = (sub_t * 1.2 + i / 5) % 1.0
        ax = TX + 30 + int((TW - 60) * (i / 4))
        ay_start = FAN_TOP - 2
        ay = ay_start - int(30 * t_off)
        alpha = max(0.0, 1.0 - t_off * 1.4)
        col = blend(PANEL_C, (200, 100, 50), alpha)
        if ay < ay_start:
            draw.line([(ax, ay), (ax, ay_start)], fill=col, width=2)


def draw_step04(draw, sub_t):
    """Soğutulmuş su çıkışı + sprey geri devri."""
    draw_coil(draw, fill_frac=1.0, fluid=COLD)

    # Cold water exit arrow (left side, lower pipe)
    t_p = pulse(sub_t, 2.5)
    col = blend(COLD, CYAN_G, t_p)
    arrow(draw, TX - 2, PROC_OUT_Y, PROC_X0 + 2, PROC_OUT_Y, col, w=3)

    # Moving cold drop
    drop_t = (sub_t * 2.2) % 1.0
    drop_x = int(TX - (TX - PROC_X0) * drop_t)
    drop_x = max(PROC_X0 + 5, drop_x)
    draw.ellipse([drop_x - 4, PROC_OUT_Y - 4, drop_x + 4, PROC_OUT_Y + 4],
                 fill=CYAN_G)

    # Basin fill rising
    rise = eio(min(1.0, sub_t * 1.5))
    basy = BASIN_BOT - 8 - int(22 * rise)
    draw.rectangle([TX + 5, basy, TR - 5, BASIN_BOT - 5],
                   fill=blend(SPRAY_D, CYAN_D, 0.35))

    # Recirculation pump (basin → water distribution) — right side
    t_p2 = pulse(sub_t, 3.5)
    pump_col = blend(CYAN_D, CYAN, t_p2)
    draw.ellipse([RPUMP_X - 11, RPUMP_Y - 11, RPUMP_X + 11, RPUMP_Y + 11],
                 fill=STEEL, outline=pump_col, width=2)
    pa = math.radians(sub_t * 360 * 2.5)
    bpx = RPUMP_X + int(6 * math.cos(pa))
    bpy = RPUMP_Y + int(6 * math.sin(pa))
    draw.line([(RPUMP_X, RPUMP_Y), (bpx, bpy)], fill=pump_col, width=2)
    draw.text((RPUMP_X + 14, RPUMP_Y), LBL["pump"], fill=SILVER, font=F_TINY, anchor="lm")

    # Recirculation arrow: basin → right pipe up to WIN_Y
    t_recirc = (sub_t * 1.8) % 1.0
    rcy = int(BASIN_TOP - (BASIN_TOP - WIN_Y) * t_recirc)
    rcx = TR + 22
    alpha = max(0.0, 1.0 - abs(t_recirc - 0.5) * 2.5)
    col_r = blend(PANEL_C, SPRAY_C, alpha)
    draw.line([(rcx, BASIN_TOP), (rcx, rcy)], fill=col_r, width=2)
    if rcy < BASIN_TOP - 5:
        draw.polygon([(rcx - 4, rcy), (rcx + 4, rcy), (rcx, rcy - 8)], fill=col_r)


# ─── Info panel ──────────────────────────────────────────────────────────────
def draw_panel(draw, step_idx, sub_t):
    s   = STEPS[step_idx]
    ac  = s["color"]

    # Background
    draw.rectangle([PX, PY, PX + PW, PY + PH], fill=PANEL_C, outline=BORDER, width=1)
    # Accent top stripe
    draw.rectangle([PX, PY, PX + PW, PY + 4], fill=ac)

    # Step number (big)
    draw.text((PX + PW // 2, PY + 62), s["num"],
              fill=ac, font=F_STEP, anchor="mm")

    # Divider
    draw.line([(PX + 18, PY + 102), (PX + PW - 18, PY + 102)],
              fill=BORDER, width=1)

    # Title
    draw.text((PX + PW // 2, PY + 126), s["title"],
              fill=WHITE, font=F_TITLE, anchor="mm")

    # Body text
    draw.text((PX + PW // 2, PY + 200), s["body"],
              fill=MIST, font=F_BODY, anchor="mm", align="center")

    # Step indicator dots
    for i, st in enumerate(STEPS):
        dy = PY + PH - 88 + i * 20
        active = i == step_idx
        r = 5 if active else 3
        col = CYAN if active else STEEL
        draw.ellipse([PX + 20 - r, dy - r, PX + 20 + r, dy + r], fill=col)
        draw.text((PX + 32, dy), st["title"],
                  fill=WHITE if active else SILVER,
                  font=F_SMALL if active else F_TINY, anchor="lm")

    # Progress bar
    bar_y = PY + PH - 14
    bar_w = PW - 30
    draw.rectangle([PX + 14, bar_y, PX + 14 + bar_w, bar_y + 6],
                   fill=(14, 24, 32), outline=CYAN_D, width=1)
    prog = (step_idx + sub_t) / 4.0
    fw = max(0, int(bar_w * prog) - 1)
    if fw > 0:
        draw.rectangle([PX + 15, bar_y + 1, PX + 15 + fw, bar_y + 5], fill=ac)

    # Circuit badge
    draw.text((PX + PW // 2, PY + PH - 130),
              LBL["badge"],
              fill=CYAN_D, font=F_TINY, anchor="mm")


# ─── Header ──────────────────────────────────────────────────────────────────
def draw_header(draw):
    draw.rectangle([0, 0, W, HDR], fill=DEEP)
    draw.line([(0, HDR), (W, HDR)], fill=CYAN_D, width=1)
    draw.text((W // 2, HDR // 2),
              LBL["header"],
              fill=CYAN, font=F_LABEL, anchor="mm")
    draw.text((W - 18, HDR // 2), "ENSOTEK",
              fill=SILVER, font=F_LABEL, anchor="rm")


# ─── Frame builder ────────────────────────────────────────────────────────────
STEP_FNS = [draw_step01, draw_step02, draw_step03, draw_step04]

def make_frame(step_idx, sub_t):
    img  = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    draw_header(draw)
    draw_tower_static(draw)
    STEP_FNS[step_idx](draw, sub_t)
    draw_panel(draw, step_idx, sub_t)

    return img.convert("P", palette=Image.ADAPTIVE, colors=200)


# ─── Main ─────────────────────────────────────────────────────────────────────
def generate(lang="tr"):
    global LANG, STEPS, LBL
    LANG  = lang
    STEPS = STEPS_TR if lang == "tr" else STEPS_EN
    LBL   = LABELS[lang]

    frames = []
    ANIM = 22
    HOLD = 6
    for step_idx in range(4):
        for f in range(ANIM):
            frames.append(make_frame(step_idx, f / ANIM))
        for _ in range(HOLD):
            frames.append(make_frame(step_idx, 1.0))

    fname = f"how-it-works-{lang}.gif"
    out   = os.path.join(os.path.dirname(__file__), fname)
    frames[0].save(
        out,
        save_all=True,
        append_images=frames[1:],
        optimize=False,
        loop=0,
        duration=75,
    )
    kb = os.path.getsize(out) / 1024
    print(f"✅  [{lang.upper()}]  {out}  ({kb:.0f} KB, {len(frames)} frames)")


def main():
    import sys
    langs = sys.argv[1:] if len(sys.argv) > 1 else ["tr", "en"]
    print(f"Generating GIF(s) for: {', '.join(langs)}")
    for lang in langs:
        if lang in ("tr", "en"):
            generate(lang)
        else:
            print(f"  ⚠ Unknown lang '{lang}', skipping.")


if __name__ == "__main__":
    main()
