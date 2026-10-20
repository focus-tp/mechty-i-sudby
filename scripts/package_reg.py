"""Package the built REG.RU site without unrelated local files in public/."""

from pathlib import Path
import subprocess
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ARCHIVE = ROOT / "output" / "reg-ru" / "mechtysudb.ru-site.zip"
UNUSED_ORIGINAL_VIDEOS = {
    Path("презентация площадка связь.MP4"),
    Path("презентация связь.MOV"),
}

if not (DIST / "index.html").is_file() or not (DIST / ".htaccess").is_file():
    raise SystemExit("Run npm run build:reg before packaging.")

index = (DIST / "index.html").read_text(encoding="utf-8")
if 'content="https://mechtysudb.ru/"' not in index or 'src="/assets/' not in index:
    raise SystemExit("The dist directory is not the REG.RU build.")

tracked = subprocess.check_output(
    ["git", "ls-files", "-z", "public"], cwd=ROOT
).split(b"\0")

files = {DIST / "index.html", DIST / ".htaccess"}
files.update(path for path in (DIST / "assets").rglob("*") if path.is_file())
for raw_path in tracked:
    if not raw_path:
        continue
    relative_path = Path(raw_path.decode()).relative_to("public")
    if relative_path in UNUSED_ORIGINAL_VIDEOS:
        continue
    path = DIST / relative_path
    if not path.is_file():
        raise SystemExit(f"Missing built file: {relative_path}")
    files.add(path)

ARCHIVE.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(ARCHIVE, "w", compression=ZIP_DEFLATED, compresslevel=6) as archive:
    for path in sorted(files):
        archive.write(path, path.relative_to(DIST))

print(f"Packaged {len(files)} files: {ARCHIVE}")
