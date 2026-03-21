import React from 'react';

export default function SemanticUI({ publicProjects, privateProjects }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'serif' }}>
      <header>
        <h1>Akshay - Software Developer</h1>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </nav>
      </header>
      <hr />

      <main>
        <section id="about">
          <h2>About Me</h2>
          <p>
            I am Akshay, a 3rd-year diploma student passionate about software development. 
            I have experience building Android applications using Java and am currently 
            building a highly complex, context-aware Meta-Portfolio OS.
          </p>
        </section>
        <hr />

        <section id="skills">
          <h2>Skills</h2>
          <dl>
            <dt><strong>Languages</strong></dt>
            <dd>Java, HTML, CSS, JavaScript, PHP</dd>
            <br />
            <dt><strong>Frameworks & Tools</strong></dt>
            <dd>Android Studio, Next.js, Git</dd>
          </dl>
        </section>
        <hr />

        <section id="projects">
          <h2>Public Projects (Live from GitHub)</h2>
          {publicProjects && publicProjects.length > 0 ? (
            publicProjects.map((project) => (
              <div key={project.id}>
                <article>
                  <details open>
                    <summary><strong>{project.name}</strong></summary>
                    <p>{project.description || "No description provided."}</p>
                    <ul>
                      <li>Language: {project.language || "Mixed"}</li>
                      <li>Stars: {project.stargazers_count}</li>
                      <li>Last Updated: {new Date(project.updated_at).toLocaleDateString()}</li>
                      <li><a href={project.html_url} target="_blank" rel="noreferrer">View Source Code</a></li>
                    </ul>
                  </details>
                </article>
                <br />
              </div>
            ))
          ) : (
            <p>Loading projects or no public projects found...</p>
          )}

          <h3>Private Projects</h3>
          {privateProjects && privateProjects.length > 0 ? (
            privateProjects.map((project) => (
              <div key={project.id}>
                <article>
                  <details>
                    <summary><strong>{project.name}</strong> 🔒</summary>
                    <p>{project.description || "No description provided (Private)."}</p>
                    <ul>
                      <li>Language: {project.language || "Mixed"}</li>
                      <li>Stars: {project.stargazers_count}</li>
                      <li>Last Updated: {new Date(project.updated_at).toLocaleDateString()}</li>
                      <li><a href={project.html_url} target="_blank" rel="noreferrer">View Repository (Private)</a></li>
                    </ul>
                  </details>
                </article>
                <br />
              </div>
            ))
          ) : (
            <p>No private projects found.</p>
          )}
        </section>
      </main>
      <br />

      <footer>
        <hr />
        <p>&copy; 2026 Akshay. Built with pure semantic HTML (and Next.js behind the scenes).</p>
      </footer>
    </div>
  );
}
