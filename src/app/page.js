import PortfolioRenderer from "@/components/PortfolioRenderer";

const GITHUB_USERNAME = "Akshay-86";

export default async function Home() {
  // Fetch GitHub repositories
  let projects = [];
  try {
    const headers = {};
    let endpoint = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

    // If a GITHUB_TOKEN is provided, fetch both public and private repositories
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
      endpoint = 'https://api.github.com/user/repos?sort=updated&affiliation=owner&per_page=100';
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

  // Fetch real latest commits for ALL projects
  // For forked repos: fetch more commits so we can filter to only the owner's
  await Promise.all(projects.map(async (repo) => {
    try {
      const isFork = repo.fork;
      // Fetch more for forks so we can filter to user's commits and still have enough
      const perPage = isFork ? 20 : 4;
      let endpoint = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=${perPage}`;
      const fetchHeaders = {};
      if (process.env.GITHUB_TOKEN) {
        fetchHeaders['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
      }
      const commitsRes = await fetch(endpoint, { headers: fetchHeaders, next: { revalidate: 3600 } });
      if (commitsRes.ok) {
        let commits = await commitsRes.json();
        if (isFork) {
          // Filter to only commits made by the repo owner (Akshay)
          const ownerLogin = GITHUB_USERNAME.toLowerCase();
          const userCommits = commits.filter(c =>
            c.author?.login?.toLowerCase() === ownerLogin ||
            c.committer?.login?.toLowerCase() === ownerLogin
          );
          repo.recentCommits = userCommits.slice(0, 4);
        } else {
          repo.recentCommits = commits;
        }
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
