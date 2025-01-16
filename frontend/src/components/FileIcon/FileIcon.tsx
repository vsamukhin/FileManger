import React from "react";
import AudioIcon from "../../assets/audio.png";
import DocIcon from "../../assets/doc.png";
import DefaultIcon from "../../assets/file.png";
import PdfIcon from "../../assets/pdf.png";
import TxtIcon from "../../assets/txt.png";
import VideoIcon from "../../assets/video.png";
import XlsIcon from "../../assets/xls.png";
import './FileIcon.css';


interface FileIconProps {
  extension: string;
  filePath: string;
}

const extensionIcons = {
  pdf: PdfIcon,
  doc: DocIcon,
  docx: DocIcon,
  xls: XlsIcon,
  xlsx: XlsIcon,
  txt: TxtIcon,

  mp4: VideoIcon,
  avi: VideoIcon,
  mov: VideoIcon,
  mkv: VideoIcon,
  webm: VideoIcon,

  mp3: AudioIcon,
  wav: AudioIcon,
  flac: AudioIcon,
  ogg: AudioIcon,
  aac: AudioIcon,
};

const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];

const FileIcon: React.FC<FileIconProps> = ({ extension, filePath}) => {
  const ext = extension.toLowerCase().slice(1) as keyof typeof extensionIcons;
  
  if (imageExtensions.includes(ext)) {
    return <img height={60} className='file-img' src={filePath} alt="file"/>;
  }

  const iconPath = extensionIcons[ext] || DefaultIcon;

  return <img className='file-img' src={iconPath} alt={`${ext}`} />;
};

export default FileIcon;