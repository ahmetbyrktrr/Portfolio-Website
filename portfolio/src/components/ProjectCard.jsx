import { useEffect, useState } from "react";

export default function ProjectCard({ project }) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [project]);

  const nextImage = () => {
    setImageIndex((current) => (current + 1) % project.images.length);
  };

  const prevImage = () => {
    setImageIndex((current) =>
      current === 0 ? project.images.length - 1 : current - 1,
    );
  };

  return (
    <article className="project-card">
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-meta">
          <span>{project.tech}</span>
          {project.tech2?.trim() && <span>{project.tech2}</span>}{project.tech3?.trim() && <span>{project.tech3}</span>}{project.tech4?.trim() && <span>{project.tech4}</span>}{project.tech5?.trim() && <span>{project.tech5}</span>}{project.tech6?.trim() && <span>{project.tech6}</span>}
        </div>
      </div>

      <div className="project-gallery">
        <button
          type="button"
          className="project-gallery-btn"
          onClick={prevImage}
          aria-label="Previous project image"
        >
          ⇐
        </button>
        <img src={project.images[imageIndex]} alt={project.title} loading="lazy" />
        <button
          type="button"
          className="project-gallery-btn"
          onClick={nextImage}
          aria-label="Next project image"
        >
          ⇒
        </button>
        <div className="project-gallery-dots">
          {project.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={index === imageIndex ? "is-active" : ""}
              onClick={() => setImageIndex(index)}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
