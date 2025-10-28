-- Create enum for e-waste types
CREATE TYPE public.ewaste_type AS ENUM ('laptop', 'printer', 'mobile', 'tablet', 'monitor', 'keyboard', 'mouse', 'other');

-- Create enum for order status
CREATE TYPE public.order_status AS ENUM ('pending', 'validated', 'rejected', 'collected', 'completed', 'cancelled');

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ewaste_type ewaste_type NOT NULL,
  image_url TEXT NOT NULL,
  recycler_name TEXT NOT NULL,
  recycler_address TEXT NOT NULL,
  recycler_lat DECIMAL(10, 8) NOT NULL,
  recycler_lng DECIMAL(11, 8) NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  validation_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();