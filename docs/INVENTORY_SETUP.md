# VPI Inventory Dashboard setup

The dashboard is added at /inventory as a separate React route. The public-facing homepage and existing routes remain unchanged.

## Secure database
1. Create a Supabase project at https://supabase.com.
2. Run supabase/schema.sql in the Supabase SQL Editor.
3. In Supabase Authentication, invite/create each management user.
4. Copy the user's Auth UUID and run: INSERT INTO public.vpi_management_users(user_id,email) VALUES ('REAL-UUID','real-email@company.com');
5. Never expose a Supabase service-role key in the browser or frontend environment.

## Vercel environment variables
Set and redeploy with:
- REACT_APP_SUPABASE_URL = Supabase project URL
- REACT_APP_SUPABASE_ANON_KEY = Supabase anon/public key
- REACT_APP_MANAGEMENT_EMAILS = comma-separated management email allowlist

The frontend allowlist controls the interface; database row-level security and vpi_management_users are the actual access control. Do not use the service-role key.

## Daily use
Open /inventory and sign in. Add stock movements and production output daily. Match the batch number on material issues and production entries. The selected month filters reports; closing stock includes all transactions through month-end.

## Excel import
The importer reads the first worksheet and appends valid records. It does not overwrite or deduplicate existing entries. Check the file before importing.
Required headings: Date, Type, Material Name, Quantity.
Optional: Part Number, Grade, Diameter, Batch No, Work Order, UOM, Unit Rate, Notes.
Allowed types: opening, receipt, issue, return, scrap, adjustment_in, adjustment_out.
A sample template is public/inventory-import-template.csv.

## Reporting definitions and limitations
- Stock = opening + receipts + returns + positive adjustments - issues - scrap - negative adjustments.
- Batch material issued is derived from issue transactions tagged with that batch.
- Production achievement = actual good output / planned good output.
- Good output yield = actual good output / (actual good output + rejected quantity).
- Machine utilisation, labour productivity, standard-vs-actual consumption, material cost per good unit and purchase price variance need reliable machine hours, labour hours, BOM/standard quantities and purchasing data. This first version does not fabricate those metrics.
- Record scrap once only. If scrap is already included in the issued quantity, do not subtract it again from stock. Agree a consistent stores recording method before go-live.
- Import verified opening stock balances before treating calculated quantities as official.
