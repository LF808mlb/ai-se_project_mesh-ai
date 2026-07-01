import { useState, useEffect } from "react";
import "./KnowledgeBase.css";
import type { KnowledgeDoc } from "../../utils/api";
import UploadArea from "../../components/UploadArea/UploadArea";
import { getDocuments, uploadDocument } from "../../utils/api";
import deleteIcon from "../../assets/Frame.png";
import deleteIconHover from "../../assets/grayframe.png";

export default function KnowledgeBase() {

  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setError(null);
    try {
      const res = await uploadDocument(file);
      const uploadedDocument = res.data?.document;
      if (uploadedDocument) {
        setDocuments((prev) => [uploadedDocument, ...prev]);
      } else {
        const docsRes = await getDocuments();
        setDocuments(docsRes.data ?? []);
      }
    } catch {
      setError("Failed to upload document.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="knowledge-base">
      <h1>Manage Your Knowledge Base</h1>
      <section className="knowledge-base__content">
        <p className="knowledge-base__upload-text">Upload documents (PDF)</p>
        <UploadArea onFileSelect={handleFileSelect} isUploading={isUploading} />
        {!isLoading && !error && documents.length > 0 && (
          <ul className="file__upload-list">
            {documents.map((doc) => (
              <li key={doc._id} className="file__upload">
                <span className="document">{doc.fileName}</span>
                <button type="button" className="delete-btn" aria-label={`Delete ${doc.fileName}`}>
                  <img src={deleteIcon} alt="" aria-hidden="true" className="delete-icon delete-icon--default" />
                  <img src={deleteIconHover} alt="" aria-hidden="true" className="delete-icon delete-icon--hover" />
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

        <button type="button" className="knowledge-base__save-btn">
          Save
        </button>
      </section>
    </div>
  );
}