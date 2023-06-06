import { NextResponse } from 'next/server';

export async function POST(request: Request) {

    return NextResponse.json(JSON.stringify({message: 'Hey bitches'}), { status: 200 });

}
