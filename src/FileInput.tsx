import { FC, useState } from "react";
import { useHooks } from "./hooks";
import Button from '@mui/material/Button';
import { styles } from "./styles";
import './App.css';
import axios from "axios";

export const FileInput: FC = () => {
  const { handleFiles, imageContainerRef, base64, inputFileRef, openDialog, resetSelection } = useHooks();
  const [ stage, setStage ] = useState(1);
  const [ resp, setResp ] = useState<string[]>([]);

  if(base64.length == 0 && stage != 1){
    setResp([]);
    setStage(1);
  }

  if(base64.length != 0 && stage == 1){
    setStage(2);
  }

  if(stage == 2 && resp.length != 0){
    setStage(3);
  }

  const upload = async() => {
    console.log(base64.length)
    if (base64.length == 0) return

    try{
      //const response = await axios.post('http://153.127.29.180/uploadmeter', {photo:base64}, {headers: {'content-type': 'application/json'}});
      const response = await axios.post('https://gamcis.jp/Django/labeltest/uploadmeter', {photo:base64}, {headers: {'content-type': 'application/json'}});
      //const response = await axios.post('http://127.0.0.1:8000/uploadmeter', {photo:base64}, {headers: {'content-type': 'application/json'}});
      let resp_tmp = [ response.data.manufact, response.data.model_num, response.data.K_num, response.data.exp_date, response.data.size, 
        response.data.serial_num, response.data.management_num, response.data.meter]
      setResp(resp_tmp);

    }catch{
      window.alert('APIの呼び出しに失敗しました');
    }

  }

    function complete() {
    window.alert('登録完了');
    resetSelection();
    setStage(1);
    setResp([]);
  }

  const ShowResult:FC = () => {
    if(stage != 3) return (
      <></>
    )

    return (
      <>
      <div><label>　　指針：<input type="text" defaultValue={resp[7]} id="meter" name="meter" /></label></div>
      <div><label>管理番号：<input type="text" defaultValue={resp[6]} id="management_num" name="management_num" /></label></div>
      <div><label>　　型番：<input type="text" defaultValue={resp[1]} id="model_num" name="model_num" /></label></div>
      <div><label>検満年月：<input type="text" defaultValue={resp[3]} id="exp_date" name="exp_date" /></label></div>
      <div><label>メーカー：<input type="text" defaultValue={resp[0]} id="manufact" name="manufact" /></label></div>
      <div><label>型承番号：<input type="text" defaultValue={resp[2]} id="K_num" name="K_num" /></label></div>
      <div><label>　　号数：<input type="text" defaultValue={resp[4]} id="size" name="size" /></label></div>
      <div><label>製造番号：<input type="text" defaultValue={resp[5]} id="serial_num" name="serial_num" /></label></div>
      <div><Button sx = {{margin: 0.3}} color = "secondary" variant="contained" onClick =  {complete}>データを登録</Button></div>
      </>
    )
  }

  const ApiCall:FC = () => {
    if( stage != 2 ) return (
      <></>
    )

    return (
      <>
        <Button sx = {{margin: 0.3}} color = "secondary" variant = "contained" onClick =  {upload}>読取実行</Button>
      </>
    )
  }

  return (
    <div>
      <input
        type = "file"
        ref = {inputFileRef}
        accept = "image/*"
        onChange = {handleFiles}
        style = {{...styles.inputFile}}
      />

      <div ref={imageContainerRef} />

      <Button sx = {{margin: 0.3}} variant = "contained" onClick =  {openDialog}>画像を選択</Button>
      
      <div><ApiCall /></div>
    
      <div><ShowResult /></div>
    </div>
  );
};
