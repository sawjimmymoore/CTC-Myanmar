import { createClient } from "@/lib/supabase/client";

export const GALLERY_BUCKET = "gallery";

export interface GalleryFile {
  name: string;
  path: string;
  url: string;
}

/** Lists uploaded images in a gallery folder (e.g. "health", "home"),
 * newest first. Returns an empty array if Supabase isn't configured yet or
 * the folder has nothing in it - callers fall back to placeholder tiles. */
export async function listGalleryImages(folder: string): Promise<GalleryFile[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from(GALLERY_BUCKET)
      .list(folder, { sortBy: { column: "created_at", order: "desc" } });
    if (error || !data) return [];

    return data
      .filter((f) => f.name && !f.name.startsWith("."))
      .map((f) => {
        const path = `${folder}/${f.name}`;
        const {
          data: { publicUrl },
        } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);
        return { name: f.name, path, url: publicUrl };
      });
  } catch {
    return [];
  }
}

export async function uploadGalleryImage(
  folder: string,
  file: File
): Promise<{ error?: string; url?: string; path?: string }> {
  const supabase = createClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${folder}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from(GALLERY_BUCKET).upload(path, file, { upsert: false });
  if (error) return { error: error.message };
  const {
    data: { publicUrl },
  } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);
  return { url: publicUrl, path };
}

export async function deleteGalleryImage(path: string): Promise<{ error?: string }> {
  const supabase = createClient();
  const { error } = await supabase.storage.from(GALLERY_BUCKET).remove([path]);
  return error ? { error: error.message } : {};
}
