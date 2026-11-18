import { DocumentPage } from "@/components/document-page";
import { pageMetadata } from "@/lib/page-metadata";

export const generateMetadata = () => pageMetadata("docs");

export default function Page() {
  return <DocumentPage slug="docs" />;
}
