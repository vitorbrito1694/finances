import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function supabaseMiddleware(request: NextRequest) {
  return await updateSession(request);
}
