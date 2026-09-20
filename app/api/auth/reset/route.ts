import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // TODO: call supabase.auth.resetPasswordForEmail() with the email
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)

  return NextResponse.json({ data, error });
  // TODO: return the result as JSON
}