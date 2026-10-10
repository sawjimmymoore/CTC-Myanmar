-- Run once in Supabase: SQL Editor > New query > paste > Run.
create table if not exists posts (
  id uuid primary key default gen_random_uuid(), slug text unique not null, title text not null,
  category text default 'Update', excerpt text default '', body text default '', cover_url text,
  published boolean not null default false, published_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text, organization text,
  service text, notes text, date date not null, time text not null,
  status text not null default 'new', created_at timestamptz default now());
create unique index if not exists bookings_slot on bookings(date, time) where status <> 'cancelled';
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null, subject text, message text not null,
  read boolean default false, created_at timestamptz default now());
alter table posts enable row level security; alter table bookings enable row level security; alter table contact_messages enable row level security;
create policy "public reads published" on posts for select using (published or auth.role() = 'authenticated');
create policy "admins write posts" on posts for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "public can book" on bookings for insert with check (status = 'new');
create policy "admins manage bookings" on bookings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "public can message" on contact_messages for insert with check (read = false);
create policy "admins manage messages" on contact_messages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
-- Lets the public booking form hide taken slots without exposing booking details.
create or replace function taken_slots(d date) returns setof text language sql security definer as
$$ select time from bookings where date = d and status <> 'cancelled' $$;
grant execute on function taken_slots(date) to anon, authenticated;
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
create policy "public views media" on storage.objects for select using (bucket_id = 'media');
create policy "admins upload media" on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

-- Editable site content (admin > Site content). One row per section, with draft and published versions.
create table if not exists content_blocks (
  key text primary key, draft jsonb not null, published jsonb not null,
  updated_at timestamptz not null default now(), updated_by uuid references auth.users(id));
alter table content_blocks enable row level security;
create policy "admins read content" on content_blocks for select using (auth.role() = 'authenticated');
create policy "admins write content" on content_blocks for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
-- Image uploads used by the content editor.
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true) on conflict (id) do nothing;
create policy "public views gallery" on storage.objects for select using (bucket_id = 'gallery');
create policy "admins upload gallery" on storage.objects for insert with check (bucket_id = 'gallery' and auth.role() = 'authenticated');
create policy "admins delete gallery" on storage.objects for delete using (bucket_id = 'gallery' and auth.role() = 'authenticated');
