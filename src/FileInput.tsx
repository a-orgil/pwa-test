import { FC, useState } from "react";
import { useHooks } from "./hooks";
import Button from '@mui/material/Button';
import { styles } from "./styles";
import './App.css';


export const FileInput: FC = () => {
  const { handleFiles, imageContainerRef, base64, inputFileRef, openDialog } = useHooks();
  const [ visible, setVisible ] = useState(true);
  //const { visible, setVisible } = useState(true);

  const upload = () => {
    console.log(base64.length)
    if (base64.length == 0) return
  }

  return (
    <div>
      {/* <>{setVisible(!visible)}</> */}
      {/* <input type="file" accept="image/*" onChange={handleFiles} /> */}
      <input
        type = "file"
        ref = {inputFileRef}
        accept = "image/*"
        onChange = {handleFiles}
        style = {{...styles.inputFile}}
      />
      {/* <Button variant = "contained" onClick =  {openDialog}>画像を選択</Button> */}
      {/* <Button variant = "contained">画像を選択</Button> */}
      <div ref={imageContainerRef} />
      <Button variant = "contained" onClick =  {openDialog}>画像を選択</Button>
      <div style ={{ visibility: visible ? "visible" : "hidden"}}>
        <Button color = "secondary" variant = "contained" onClick =  {upload}>OCR実行</Button>
      </div>
      {/* <div ref={inputFileRef} /> */}
    </div>
  );
};
