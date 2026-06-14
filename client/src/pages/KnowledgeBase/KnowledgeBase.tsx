import { useState } from "react";
import "./KnowledgeBase.css";
import type { KnowledgeDoc } from "../../utils/api";
import {UploadArea} from "../../components/UploadArea/UploadArea";

export default function KnowledgeBase() {

  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="knowledge-base">
      <h1>Manage Your Knowledge Base</h1>
      <section className="knowledge-base__content">
        <p>Upload documents (PDF)</p>
        <UploadArea />
        {/* document list goes here later */}
        <button>Save</button>
      </section>
    </div>
  );
}