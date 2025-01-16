import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './FileViewer.css';

interface FileViewerProps {
  fileUrl: string;
  extension: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ fileUrl, extension }) => {
  const [fileType, setFileType] = useState<string>('');

  useEffect(() => {
    const getFileType = () => {
    
      if (!extension) return 'unknown';

      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
      const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
      const audioExtensions = ['.mp3', '.wav', '.aac', '.ogg'];
      const pdfExtensions = ['.pdf'];
      const documentExtensions = ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];

      if (imageExtensions.includes(extension)) return 'image';
      if (videoExtensions.includes(extension)) return 'video';
      if (audioExtensions.includes(extension)) return 'audio';
      if (pdfExtensions.includes(extension)) return 'pdf';
      if (documentExtensions.includes(extension)) return 'document';

      return 'unknown';
    };

    setFileType(getFileType());
  }, [fileUrl, extension]);

  const renderContent = () => {
    switch (fileType) {
      case 'image':
        return <img src={fileUrl} alt="File content" style={{ maxWidth: '100%', maxHeight: '100%' }} />;
      case 'video':
        return <ReactPlayer url={fileUrl} controls width="100%" height="100%" />;
      case 'audio':
        return (
          <audio controls className='viewer-audio'>
            <source src={fileUrl} />
            Your browser does not support the audio element.
          </audio>
        );
      case 'pdf':
        return <iframe  className='viewer-pdf' src={fileUrl} />;
      case 'document':
        return (
          <iframe
            src={`https://docs.google.com/viewer?url=${fileUrl}&embedded=true`}
            width="100%"
            height="600"
          ></iframe>
        );
      default:
        return <p>Неподдерживаемый или неизвестный тип файла</p>;
    }
  };

  console.log(fileUrl);

  return (
    <>
      {renderContent()}
    </>
  );
};

export default FileViewer;
