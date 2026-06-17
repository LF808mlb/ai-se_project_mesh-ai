import "./Intro.css";
import { useNavigate } from "react-router-dom";
import introIcon1 from "../../assets/IntroIcon1.png";
import introIcon2 from "../../assets/IntroIcon2.png";
import introIcon3 from "../../assets/IntroIcon3.png";
import purpleLogo from "../../assets/purplelogo.png";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <section className="intro">
      <div className="intro__title-row">
        <h1 className="intro__title">Welcome to Mesh AI</h1>
        <img className="intro__purple-logo" src={purpleLogo} alt="" aria-hidden="true" />
      </div>

      <div className="intro__cards" aria-label="Feature highlights">
        <article className="intro__card">
          <img className="intro__icon" src={introIcon1} alt="Upload documents" />
          <p className="intro__card-text">Bring all your documents into one secure AI workspace</p>
        </article>

        <article className="intro__card">
          <img className="intro__icon" src={introIcon2} alt="Search your content" />
          <p className="intro__card-text">Organize and manage the documents that power your AI
</p>
        </article>

        <article className="intro__card">
          <img className="intro__icon" src={introIcon3} alt="Chat with your knowledge" />
          <p className="intro__card-text">Your knowledge base, accessible through a simple chat interface
</p>
        </article>
      </div>

      <footer className="intro__footer">
        <p className="intro__subtitle">
          Start by creating your Organization's Knowledge Base.
        </p>

        <button
          type="button"
          className="intro__start-btn"
          onClick={() => navigate("/knowledge")}
        >
          Start
        </button>
      </footer>
    </section>
  );
}