"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Upload, X, Loader2, Images } from "lucide-react";
const PROGRAM_ICONS = ["star"];
import { uploadGalleryImage, listGalleryImages, type GalleryFile } from "@/lib/gallery";

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };
export type { JSONValue };

interface AutoFieldProps {
  label: string;
  value: JSONValue;
  onChange: (next: JSONValue) => void;
  depth?: number;
}

/** Any string field whose key name suggests it holds an image URL (not
 * "icon", which is a fixed Lucide icon key like "scale" or "heart-pulse" —
 * a picker from a preset set, not an upload) gets an upload control instead
 * of a plain text input. */
function looksLikeImageField(key: string) {
  return /image|logo|photo|banner/i.test(key);
}

/** Copy of an array item for the "Add" button, with image fields emptied so
 * a new entry doesn't start out showing the previous entry's photo. */
function blankImages(v: JSONValue, key = ""): JSONValue {
  if (typeof v === "string") return looksLikeImageField(key) ? "" : v;
  if (Array.isArray(v)) return v.map((x) => blankImages(x, key));
  if (v && typeof v === "object") {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blankImages(x, k)]));
  }
  return v;
}

const LIBRARY_FOLDERS: { folder: string; label: string }[] = [
  { folder: "org-profile-banner", label: "Org Profile - top banner" },
  { folder: "labor-rights", label: "Migrant Worker Rights & Labor Protection" },
  { folder: "safe-migration", label: "Safe Migration & Anti-Trafficking" },
  { folder: "gbv-pseah", label: "GBV Prevention & PSEAH" },
  { folder: "health", label: "Health (TB/HIV)" },
  { folder: "outreach", label: "Community Outreach & Referral Services" },
  { folder: "content", label: "Uploaded from editors" },
];

/** Pop-up listing every photo already uploaded to the library (all folders),
 * so one can be used here without uploading it again. */
function LibraryPicker({ onPick, onClose }: { onPick: (url: string) => void; onClose: () => void }) {
  const [groups, setGroups] = useState<{ label: string; files: GalleryFile[] }[] | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await Promise.all(
        LIBRARY_FOLDERS.map(async (f) => ({ label: f.label, files: await listGalleryImages(f.folder) }))
      );
      if (alive) setGroups(res.filter((g) => g.files.length > 0));
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-paper p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Choose from uploaded photos</h3>
          <button type="button" onClick={onClose} className="text-ink/50 hover:text-ink" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {groups === null ? (
          <p className="text-sm text-ink/50">Loading photos…</p>
        ) : groups.length === 0 ? (
          <p className="text-sm text-ink/50">No photos uploaded yet. Use &ldquo;Upload photo&rdquo; instead.</p>
        ) : (
          <div className="space-y-6">
            {groups.map((g) => (
              <div key={g.label}>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink/40">{g.label}</div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {g.files.map((f) => (
                    <button
                      key={f.path}
                      type="button"
                      onClick={() => onPick(f.url)}
                      className="aspect-square overflow-hidden rounded-lg border border-line transition-all hover:border-maroon-700 hover:shadow-md"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    const { url, error: uploadError } = await uploadGalleryImage("content", file);
    setUploading(false);
    if (uploadError || !url) {
      setError(uploadError || "Upload failed");
      return;
    }
    onChange(url);
  }

  return (
    <div>
      <label className="text-xs font-medium text-ink/60">{label}</label>
      <div className="mt-1.5 flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-cream-2">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[9px] text-ink/30">No image</span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink/75 transition-colors hover:border-maroon-700">
            {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
            {uploading ? "Uploading…" : value ? "Replace photo" : "Upload photo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
                e.target.value = "";
              }}
            />
          </label>
          <button
            type="button"
            onClick={() => setPicking(true)}
            className="flex w-fit items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink/75 transition-colors hover:border-maroon-700"
          >
            <Images size={12} /> Choose from uploaded photos
          </button>
          {value && (
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="w-fit text-[11px] font-medium text-ink/45 underline hover:text-maroon-700"
            >
              Open photo in new tab
            </a>
          )}
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex w-fit items-center gap-1 text-[11px] font-medium text-ink/40 hover:text-red-600"
            >
              <X size={11} /> Remove
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {picking && (
        <LibraryPicker
          onPick={(url) => {
            onChange(url);
            setPicking(false);
          }}
          onClose={() => setPicking(false)}
        />
      )}
    </div>
  );
}

function isBilingual(v: unknown): v is { en: string; my: string } {
  return (
    !!v &&
    typeof v === "object" &&
    !Array.isArray(v) &&
    "en" in (v as object) &&
    "my" in (v as object) &&
    typeof (v as Record<string, unknown>).en === "string"
  );
}

function labelize(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

/** Renders one field of any shape and recurses into objects/arrays. This is
 * what lets the admin editor work for every content section without a
 * hand-written form per section - it just reflects the JSON structure. */
export default function AutoField({ label, value, onChange, depth = 0 }: AutoFieldProps) {
  // Bilingual {en, my} pair - the most common shape in this content model.
  if (isBilingual(value)) {
    return (
      <div>
        <label className="text-xs font-medium text-ink/60">{label}</label>
        <div className="mt-1 grid gap-2 sm:grid-cols-2">
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-ink/35">English</div>
            {value.en.length > 70 ? (
              <textarea
                rows={3}
                value={value.en}
                onChange={(e) => onChange({ ...value, en: e.target.value })}
                className="w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-maroon-700"
              />
            ) : (
              <input
                value={value.en}
                onChange={(e) => onChange({ ...value, en: e.target.value })}
                className="w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-maroon-700"
              />
            )}
          </div>
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-ink/35">Myanmar</div>
            {value.my.length > 70 ? (
              <textarea
                rows={3}
                value={value.my}
                onChange={(e) => onChange({ ...value, my: e.target.value })}
                className="w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-maroon-700"
              />
            ) : (
              <input
                value={value.my}
                onChange={(e) => onChange({ ...value, my: e.target.value })}
                className="w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-maroon-700"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Array of objects (e.g. programs, opportunities, impact rows) - repeatable cards.
  if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null && !isBilingual(value[0])) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-ink/60">{label}</label>
          <button
            type="button"
            onClick={() => onChange([...(value as JSONValue[]), blankImages(structuredClone((value as JSONValue[])[0]))])}
            className="flex items-center gap-1 text-xs font-semibold text-maroon-700 hover:underline"
          >
            <Plus size={12} /> Add
          </button>
        </div>
        <div className="mt-2 space-y-3">
          {(value as JSONValue[]).map((item, i) => (
            <div key={i} className="rounded-xl border border-line bg-cream-2/50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  {label} #{i + 1}
                </span>
                {(value as JSONValue[]).length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...(value as JSONValue[])];
                      next.splice(i, 1);
                      onChange(next);
                    }}
                    className="text-ink/35 hover:text-red-600"
                    aria-label="Remove"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {Object.entries(item as Record<string, JSONValue>).map(([k, v]) => (
                  <AutoField
                    key={k}
                    label={labelize(k)}
                    value={v}
                    depth={depth + 1}
                    onChange={(nv) => {
                      const next = [...(value as JSONValue[])];
                      next[i] = { ...(item as Record<string, JSONValue>), [k]: nv };
                      onChange(next);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // List of bilingual items (e.g. a program's bullet points) - one editable
  // English/Myanmar pair per entry, with add and remove.
  if (Array.isArray(value) && value.length > 0 && value.every(isBilingual)) {
    const list = value as { en: string; my: string }[];
    return (
      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-ink/60">{label}</label>
          <button
            type="button"
            onClick={() => onChange([...list, { en: "", my: "" }])}
            className="flex items-center gap-1 text-xs font-semibold text-maroon-700 hover:underline"
          >
            <Plus size={12} /> Add
          </button>
        </div>
        <div className="mt-2 space-y-3">
          {list.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1">
                <AutoField
                  label={`${label} #${i + 1}`}
                  value={item}
                  depth={depth + 1}
                  onChange={(nv) => {
                    const next = [...list];
                    next[i] = nv as { en: string; my: string };
                    onChange(next);
                  }}
                />
              </div>
              {list.length > 1 && (
                <button
                  type="button"
                  onClick={() => onChange(list.filter((_, j) => j !== i))}
                  className="mt-6 text-ink/35 hover:text-red-600"
                  aria-label="Remove"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Array of primitives (e.g. donate amount tiers: [10, 25, 50]).
  if (Array.isArray(value)) {
    return (
      <div>
        <label className="text-xs font-medium text-ink/60">{label} (comma-separated)</label>
        <input
          value={(value as (string | number)[]).join(", ")}
          onChange={(e) => {
            const raw = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
            const allNumeric = raw.every((s) => !isNaN(Number(s)));
            onChange(allNumeric ? raw.map(Number) : raw);
          }}
          className="mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-maroon-700"
        />
      </div>
    );
  }

  // Plain nested object (not bilingual) - recurse field by field.
  if (value !== null && typeof value === "object") {
    return (
      <div className="space-y-3 rounded-xl border border-line bg-cream-2/40 p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">{label}</div>
        {Object.entries(value as Record<string, JSONValue>).map(([k, v]) => (
          <AutoField
            key={k}
            label={labelize(k)}
            value={v}
            depth={depth + 1}
            onChange={(nv) => onChange({ ...(value as Record<string, JSONValue>), [k]: nv })}
          />
        ))}
      </div>
    );
  }

  // Number
  if (typeof value === "number") {
    return (
      <div>
        <label className="text-xs font-medium text-ink/60">{label}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-maroon-700"
        />
      </div>
    );
  }

  // Program icon: a fixed set, so pick from a list instead of typing a name.
  if (typeof value === "string" && label === "Icon") {
    return (
      <div>
        <label className="text-xs font-medium text-ink/60">{label}</label>
        <select
          value={PROGRAM_ICONS.includes(value) ? value : PROGRAM_ICONS[0]}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-maroon-700"
        >
          {PROGRAM_ICONS.map((ic) => (
            <option key={ic} value={ic}>
              {ic}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Image URL (key name suggests it, e.g. backgroundImage, logoUrl, photo)
  if (typeof value === "string" && looksLikeImageField(label)) {
    return <ImageField label={label} value={value} onChange={(nv) => onChange(nv)} />;
  }

  // Plain string (other URLs, icon keys, slugs, etc.)
  return (
    <div>
      <label className="text-xs font-medium text-ink/60">{label}</label>
      <input
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-maroon-700"
      />
    </div>
  );
}
