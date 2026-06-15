import { useState, useEffect } from "react";
import "./KnowledgeBase.css";
import type { KnowledgeDoc } from "../../utils/api";
import UploadArea from "../../components/UploadArea/UploadArea";
import { getDocuments } from "../../utils/api";
import deleteIcon from "../../assets/Frame.png";

export default function KnowledgeBase() {

  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getDocuments();

        if (!res.success) {
          throw new Error();
        }

        setDocuments(res.data ?? []);
      } catch {
        setError("Failed to load documents.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleFileSelect = (file: File) => {
    const newDoc: KnowledgeDoc = {
      _id: Date.now().toString(),
      title: file.name,
      fileName: file.name,
      userId: 'local',
      createdAt: new Date().toISOString(),
    };
    setDocuments([newDoc, ...documents]);
  };

  return (
    <div className="knowledge-base">
      <h1>Manage Your Knowledge Base</h1>
      <section className="knowledge-base__content">
        <p>Upload documents (PDF)</p>
        <UploadArea onFileSelect={handleFileSelect} />
        {!isLoading && !error && documents.length > 0 && (
          <ul className="file__upload-list">
            {documents.map((doc) => (
              <li key={doc._id} className="file__upload">
                <span className="document">{doc.fileName}</span>
                <button type="button" className="delete-btn" aria-label={`Delete ${doc.fileName}`}>
                  <img src={deleteIcon} alt="" aria-hidden="true" className="delete-icon" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {isLoading && <p className="state-message">Loading documents...</p>}
        {!isLoading && error && <p className="state-message state-message--error">{error}</p>}
        {!isLoading && !error && documents.length === 0 && (
          <p className="state-message">No documents yet.</p>
        )}
        <button className="knowledge-base__save-btn">Save</button>
      </section>
    </div>
  );
}