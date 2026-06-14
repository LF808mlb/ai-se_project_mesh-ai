import { useState } from "react";
import "./KnowledgeBase.css";
import type { KnowledgeDoc } from "../../utils/api";

export default function KnowledgeBase() {

  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return <div>Knowledge Base</div>;
}