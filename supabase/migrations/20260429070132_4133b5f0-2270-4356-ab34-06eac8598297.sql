ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS pickup_date date,
  ADD COLUMN IF NOT EXISTS pickup_time_slot text,
  ADD COLUMN IF NOT EXISTS tracking_number text UNIQUE DEFAULT ('EW-' || upper(substring(replace(gen_random_uuid()::text,'-','') from 1 for 10)));

-- Add new tracking statuses to enum if not present
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel='scheduled' AND enumtypid='order_status'::regtype) THEN
    ALTER TYPE order_status ADD VALUE 'scheduled';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel='out_for_pickup' AND enumtypid='order_status'::regtype) THEN
    ALTER TYPE order_status ADD VALUE 'out_for_pickup';
  END IF;
END$$;