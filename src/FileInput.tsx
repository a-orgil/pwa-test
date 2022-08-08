import { FC, useState } from "react";
import { useHooks } from "./hooks";
import Button from '@mui/material/Button';
import { styles } from "./styles";
import './App.css';


export const FileInput: FC = () => {
  const { handleFiles, imageContainerRef, base64, inputFileRef, openDialog } = useHooks();
  const [ visible, setVisible ] = useState(true);
  //const { visible, setVisible } = useState(true);

  // POST メソッドの実装の例
  async function postData(url = '', data = {}) {
    // 既定のオプションには * が付いています
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致させる必要があります
    })
    return response; // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
  }


  const upload = () => {
    console.log(base64.length)
    if (base64.length == 0) return

    //postData('http://153.127.29.180/api/upload/', { photo: base64 })
    postData('http://127.0.0.1:8000/posttest', { ping: "hi" })
    //postData('http://127.0.0.1:8000/upload', { photo: base64 })
    .then(response => response.json())
    .then(data => {
      console.log(data); // `data.json()` の呼び出しで解釈された JSON データ
    });

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
