import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";

const FileCompresser = (image: File | null, deps?: any[]) => {
  const [compression, setCompression] = useState<File | null>(null);

  useEffect(
    () => {
      // 定义异步函数进行图片压缩
      const compressImage = async () => {
        try {
          // 配置压缩选项
          const options = {
            maxSizeMB: 1, // 设置最大文件大小 (MB)
            maxWidthOrHeight: 1920, // 设置图片的最大宽度或高度
            useWebWorker: true, // 使用 WebWorker 加速压缩
          };

          if (image) {
            const compressedFile = await imageCompression(image, options);
            setCompression(compressedFile);
            console.log(
              "Original size:",
              image.size,
              "Compressed size:",
              compressedFile.size
            );
          }
        } catch (error) {
          console.error("Error compressing image:", error);
        }
      };

      // 调用异步压缩函数
      compressImage();
    },
    deps ? [...deps] : [image]
  ); // 依赖项默认为 image

  return { compression };
};

export default FileCompresser;
