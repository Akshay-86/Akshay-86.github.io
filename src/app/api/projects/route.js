import { NextResponse } from 'next/server';

export async function GET() {
  // This is the "Secure Middleman" we talked about!
  // Because this code runs on the Server (Node.js), not in the browser,
  // we can safely use an environment variable (like process.env.GITHUB_TOKEN)
  // to fetch your private repositories without anyone stealing the token.

  // For now, here is a mock response demonstrating how the Middleman 
  // sanitizes data before sending it to your portfolio frontend.
  const privateProjects = [
    {
      id: "private-1",
      name: "Super Secret Startup App",
      description: "NDA Protected Android App and Backend services.",
      language: "Java / Node.js",
      stargazers_count: 0,
      updated_at: new Date().toISOString(),
      html_url: "#" // No link provided for private projects
    }
  ];

  return NextResponse.json(privateProjects);
}
