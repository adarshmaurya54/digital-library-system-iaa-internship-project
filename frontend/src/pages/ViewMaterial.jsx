import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function ViewMaterial({ materialData }) {
  // const googleUrl = `https://docs.google.com/gview?url=${encodeURIComponent()}&embedded=true`;

  return <iframe src={materialData[0].uri} width="100%" height="600" />;
}

export default ViewMaterial;
