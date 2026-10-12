-- Additive, backward-compatible schema update for the educational cart.
-- Existing records keep one unit and legacy clients can still insert without quantity.
ALTER TABLE public.kenzieburguer_cart_items
  ADD COLUMN IF NOT EXISTS quantity integer NOT NULL DEFAULT 1;

DO $migration$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'kenzieburguer_cart_items_quantity_check'
      AND conrelid = 'public.kenzieburguer_cart_items'::regclass
  ) THEN
    ALTER TABLE public.kenzieburguer_cart_items
      ADD CONSTRAINT kenzieburguer_cart_items_quantity_check
      CHECK (quantity BETWEEN 1 AND 99);
  END IF;
END
$migration$;

COMMENT ON COLUMN public.kenzieburguer_cart_items.quantity IS
  'Number of units per product in a user-owned educational cart (1..99).';

-- Only the quantity field can be updated from the browser.
GRANT SELECT, INSERT, DELETE ON TABLE public.kenzieburguer_cart_items TO authenticated;
GRANT UPDATE (quantity) ON TABLE public.kenzieburguer_cart_items TO authenticated;

DO $policy$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'kenzieburguer_cart_items'
      AND policyname = 'burger_cart_update_own'
  ) THEN
    CREATE POLICY burger_cart_update_own
      ON public.kenzieburguer_cart_items
      FOR UPDATE TO authenticated
      USING ((SELECT auth.uid()) = user_id)
      WITH CHECK ((SELECT auth.uid()) = user_id);
  END IF;
END
$policy$;
