-- Fix storage bucket RLS policies for avatars bucket
-- Allow authenticated users to upload their e-waste images

CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Authenticated users can view their images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Public can view images in avatars bucket"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Add brand column to orders table
ALTER TABLE orders ADD COLUMN brand text NOT NULL DEFAULT 'Unknown';

-- Add estimated_amount column to orders table
ALTER TABLE orders ADD COLUMN estimated_amount numeric NOT NULL DEFAULT 0;