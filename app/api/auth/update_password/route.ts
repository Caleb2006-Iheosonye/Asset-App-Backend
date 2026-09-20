import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const { newPassword } = await request.json();

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // TODO: call supabase.auth.updateUser() with the new password
  // (use the variable newPassword here, not a hardcoded string)
  const { data, error } = await supabase.auth.updateUser({ password: newPassword })
  // TODO: return the result as JSON
  return NextResponse.json({ data, error });
}