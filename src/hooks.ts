import { type } from "os";
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react";
import { imageDisplaySize } from './styles';

const fileImage = new Image();
export const useHooks = () => {
  const [base64, setBase64] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [objectURL, setObjectURL] = useState("");
  const manipulateImageSize = (url:string) => {
    fileImage.src = url;
    fileImage.onload = () => {
			const width = fileImage.naturalWidth;
			const height = fileImage.naturalHeight;
			const ratioWidth = width / imageDisplaySize.width;
			const ratioHeight = height / imageDisplaySize.height;
			if (ratioWidth > ratioHeight) {
				fileImage.width = imageDisplaySize.width;
				fileImage.height = height / ratioWidth;
			} else {
				fileImage.width = width / ratioHeight;
				fileImage.height = imageDisplaySize.height;
			}
		};
  }  
  const resetSelection = () => {
    fileImage.src = "";
    setBase64("");
    const imageContainer = imageContainerRef.current;
    if (imageContainer && fileImage.parentNode === imageContainer) {
      imageContainer.removeChild(fileImage);
    }
    if (objectURL) {
      window.URL.revokeObjectURL(objectURL);
      setObjectURL("");
    }
  };
  
  const handleFiles: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.currentTarget.files;
    resetSelection();
    if (!files || files?.length === 0) return;
    const file = files[0];
    if (!file.type.includes("image/")) {
      event.currentTarget.value = "";
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
		  var base64String = reader.result;
      if(typeof(base64String) != 'string') return;
      base64String = base64String.replace(/data:.*\/*;base64,/, '');
      setBase64(base64String);
    }

    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;
    const objectURL = window.URL.createObjectURL(file);
    //fileImage.src = objectURL;
    manipulateImageSize(objectURL);
    imageContainer.appendChild(fileImage);
    setObjectURL(objectURL);
  };

  const openDialog: MouseEventHandler<HTMLButtonElement>= () => {
    const inputFile = inputFileRef.current;
    if (!inputFile) return;
    inputFile.click();
  }

  return { handleFiles, imageContainerRef, base64, inputFileRef, openDialog, resetSelection };
  //return { handleFiles, imageContainerRef };,

};
