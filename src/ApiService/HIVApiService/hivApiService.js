
import axios from "axios"


export const getHivDataExcel = (data, onSuccess, onError, finallyCallBack) => {

  axios({
    url: `${process.env.REACT_APP_HIV_API}`,
    method:'POST',
    data: JSON.stringify(data),
    responseType: 'blob', // important
  }).then((response) => {
    if (!response.data) {
      throw new Error('no response')
    }
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.xlsx');
    document.body.appendChild(link)
    link.click()

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onSuccess()
  }).catch((err) => {
    console.log(err)
    onError()
  })
}