import { FC, useState } from "react";
import { useHooks } from "./hooks";
import Button from '@mui/material/Button';
import { styles } from "./styles";

export const FileInput: FC = () => {
  const { handleFiles, imageContainerRef, inputFileRef, openDialog } = useHooks();
  //const { visible, setVisible } = useState(true);
  return (
    <div>
      {/* <input type="file" accept="image/*" onChange={handleFiles} /> */}
      <input
        type = "file"
        ref = {inputFileRef}
        accept = "image/*"
        onChange = {handleFiles}
        style = {{...styles.inputFile}}
      />
      <Button variant = "contained" onClick =  {openDialog}>画像を選択</Button>
      {/* <Button variant = "contained">画像を選択</Button> */}
      <div ref={imageContainerRef} />
      {/* <div ref={inputFileRef} /> */}
    </div>
  );
};
