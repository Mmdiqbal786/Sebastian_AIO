import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const uploadFileToS3 = async (
  file: File,
  bucketName: string,
  keyPrefix = "uploads/",
  onProgress?: (percent: number) => void
) => {
  const upload = new Upload({
    client: s3,
    params: { Bucket: bucketName, Key: keyPrefix + file.name, Body: file },
    queueSize: 1,
    partSize: 5 * 1024 * 1024
  });

  if (onProgress) {
    upload.on("httpUploadProgress", (progress) => {
      if (progress.loaded && progress.total) {
        onProgress(Math.round((progress.loaded / progress.total) * 100));
      }
    });
  }

  await upload.done();
  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${keyPrefix}${file.name}`;
};

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
