import PortfolioRenderer from "@/components/PortfolioRenderer";

export default async function Home() {
  // Fetch GitHub repositories
  let projects = [];
  try {
    const headers = {};
    let endpoint = 'https://api.github.com/users/Akshay-86/repos?sort=updated';

    // If a GITHUB_TOKEN is provided, fetch both public and private repositories
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
      endpoint = 'https://api.github.com/user/repos?sort=updated&affiliation=owner';
    }

    const res = await fetch(endpoint, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limiting
    });
    if (res.ok) {
      projects = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch projects");
  }

  // Fetch real latest commits for the top 6 projects to provide authentic "Major Implementations" history
  const topProjects = projects.slice(0, 6);
  await Promise.all(topProjects.map(async (repo) => {
    try {
      let endpoint = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=4`;
      const fetchHeaders = {};
      if (process.env.GITHUB_TOKEN) {
        fetchHeaders['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
      }
      const commitsRes = await fetch(endpoint, { headers: fetchHeaders, next: { revalidate: 3600 } });
      if (commitsRes.ok) {
        repo.recentCommits = await commitsRes.json();
      }
    } catch(e) {
      console.error(`Failed to fetch commits for ${repo.name}`);
    }
  }));

  // Separate into public and private (including forks)
  const publicProjects = projects.filter(p => !p.private);
  const privateProjects = projects.filter(p => p.private);

  return <PortfolioRenderer publicProjects={publicProjects} privateProjects={privateProjects} />;
}
