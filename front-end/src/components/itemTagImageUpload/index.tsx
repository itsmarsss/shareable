// ImageUpload.tsx
import React, { useState, ChangeEvent } from 'react';
import { useAuth } from '../authProvider';
import Button from '../button';

interface ImageUploadProps {
    onUploadSuccess: (name: string, price: number) => void;
  }
  

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const auth = useAuth();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/marketplace/process-item-tag', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
      });

      const res = await response.json();

      if (res.success) {
        setUploadStatus('File uploaded successfully.');
        onUploadSuccess(res.name, res.price);
      } else {
        setUploadStatus('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
      <Button onClick={handleFileUpload}>Upload</Button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ImageUpload;
