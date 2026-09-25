import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // TODO: call supabase.auth.signInWithPassword() with email and password
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  // TODO: return the result as JSON
 if (error) {
    console.error('Verify OTP error:', error.message);
    return NextResponse.json(
      { data: null, error: error.message },
      { status: error.status || 400, headers: corsHeaders }
    );
  }

  return NextResponse.json({ data, error }, { headers: corsHeaders });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

