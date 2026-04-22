export const updateS3Upload = async (
  presignedUrl: string,
  blob: Blob,
  mimeType: string
) => {
  const res = await fetch(presignedUrl, {
    method: 'PUT',
    body: blob,
    headers: { 'Content-Type': mimeType },
  });
  if (!res.ok) throw new Error('S3 업로드 실패');
};
