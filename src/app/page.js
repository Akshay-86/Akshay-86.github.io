import PortfolioRenderer from "@/components/PortfolioRenderer";
import { fetchReleaseAndPreviews } from "@/lib/github";
import { PROJECT_METADATA_OVERRIDES } from "@/data/portfolioData";

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

  // Fetch real latest commits AND releases/previews for ALL projects
  await Promise.all(projects.map(async (repo) => {
    const fetchHeaders = {};
    if (process.env.GITHUB_TOKEN) {
      fetchHeaders['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // 1. Fetch commits
    try {
      const isFork = repo.fork;
      const perPage = isFork ? 20 : 4;
      const endpoint = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=${perPage}`;
      const commitsRes = await fetch(endpoint, { headers: fetchHeaders, next: { revalidate: 3600 } });
      if (commitsRes.ok) {
        let commits = await commitsRes.json();
        if (isFork) {
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

    // 2. Fetch releases (APK, version, release notes) and previews
    const meta = PROJECT_METADATA_OVERRIDES[repo.name];
    try {
      const { latestRelease, version, previews } = await fetchReleaseAndPreviews(repo, fetchHeaders);
      repo.latestRelease = latestRelease || meta?.defaultRelease || null;
      repo.version = version || meta?.defaultRelease?.version || null;
      repo.previews = previews;
    } catch (e) {
      repo.latestRelease = meta?.defaultRelease || null;
      repo.version = meta?.defaultRelease?.version || null;
      repo.previews = null;
    }

    // 3. Apply metadata overrides and categories
    if (meta) {
      repo.customTitle = meta.customTitle;
      repo.badge = meta.badge;
      repo.category = meta.category;
      repo.summary = meta.summary;
      repo.techStack = meta.techStack;
      repo.accent = meta.accent;
      if (meta.featured !== undefined) repo.featured = meta.featured;
    } else {
      const lang = (repo.language || "").toLowerCase();
      if (lang.includes("kotlin") || lang.includes("java")) {
        repo.category = "android";
      } else if (lang.includes("c") || lang.includes("rust") || lang.includes("assembly")) {
        repo.category = "systems";
      } else if (lang.includes("javascript") || lang.includes("typescript") || lang.includes("html") || lang.includes("css")) {
        repo.category = "web";
      } else {
        repo.category = "other";
      }
    }
  }));

  // Separate into public and private (including forks)
  const publicProjects = projects.filter(p => !p.private);
  const privateProjects = projects.filter(p => p.private);

  return <PortfolioRenderer publicProjects={publicProjects} privateProjects={privateProjects} />;
}
