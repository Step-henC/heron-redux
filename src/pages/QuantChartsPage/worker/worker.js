// keep in mind cannot import any external functions or third party libraries

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = function (event) {
    const eventData = event.data
    if (eventData?.source === 'heron-quant-chart'){
  
        
        const uniquePeptideList = collectUniquePeptideNames(event.data.payload)

       

          // alternatively just postMessage(result)
          postMessage({message: 'ok', payload: uniquePeptideList})
      
    }

  // send this to main thread
  postMessage({message: 'nothing received', payload: null})
}

 const collectUniquePeptideNames = (fileData) => {
  if (fileData === null) {
    return [];
  }
  if (fileData.length === 0) {
    return [];
  }
  const uniquePeptideNames = [];

  for (const row of fileData) {
    if (!uniquePeptideNames.includes(row.Peptide)) {
      uniquePeptideNames.push(row.Peptide);
    }
  }
  return uniquePeptideNames;
};


}