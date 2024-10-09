// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Configuration, OpenAI from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: 'No prompt provided.' }, { status: 400 });
  }

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // You can choose a different model here
      prompt,
      max_tokens: 100,
    });

    return NextResponse.json({ response: response.data.choices[0].text });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
