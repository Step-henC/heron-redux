import { unparse } from "papaparse";


export const exportCSV = (fileData) => {
  const wholeData = [...fileData]

  const newList = [];
  wholeData.forEach((item) => {
    const obj = {
      Peptide: item?.Peptide,
      Replicate: item?.Replicate,
      Protein: item?.Protein,
      "Peptide Peak Found Ratio": item["Peptide Peak Found Ratio"],
      "Peptide Retention Time": item["Peptide Retention Time"],
      "Ratio To Standard": item["Ratio To Standard"],
      "Ratio Average": item?.RatioAvg,
      "Ratio Standard Deviation": item?.RSTDEV,
      "Ratio Coefficient of Variance": item?.RatioCove,
      Quantification: item?.Quantification,
      "Quantification Average": item?.QuantAvg,
      "Quantification Standard Deviation": item?.QSTDEV,
      "Quantification Coefficient of Variance": item?.QuantCove,
    };
    newList.push(obj);
  });

  const resultCSV = unparse(newList);

  var csvData = new Blob([resultCSV], { type: "text/csv;charset=utf-8;" });

  var csvURL = window.URL.createObjectURL(csvData);

  var testLink = document.createElement("a");
  testLink.href = csvURL;
  testLink.click();

};