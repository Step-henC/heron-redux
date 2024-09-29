import { std } from 'mathjs'; //large module slows page load times, but necessary tradeoff
//rsBuild what we are using is an abstraction layer of rspack (under the hood)
// rspack has code splitting for specific vendors but rsbuild does not
// future directions require investigating how to customize rspack for our rsbuild (with merge strategy or something)
// alternatively could lazy load this export function
// but comes with larger load times (network requests too) and not worth the tradeoff
import { isEmpty, uniqueId } from 'lodash';
const parseFloatFromObjectCopy = (objCopy) => {
  const ratio = parseFloat(objCopy['Ratio To Standard']);
  const quant = parseFloat(objCopy?.Quantification.toString().split(' ').at(0));

  isNaN(ratio)
    ? (objCopy.ParsedRatioToStandard = 0)
    : (objCopy.ParsedRatioToStandard = ratio);
  isNaN(quant)
    ? (objCopy.ParsedQuantification = 0)
    : (objCopy.ParsedQuantification = quant);

  return objCopy;
};

const processOutliersFromFileData = (fileArray, outlierList) => {
  if (outlierList.length === 0) {
    return {
      filteredFile: fileArray,
      outlier2DListOfRowGroupedByReplicate: [[]],
    };
  }

  // if someone passes an empty arr or an empty 2D array
  // redux store holds empty 2D, but just in case
  if (outlierList.some((innerArr) => isEmpty(innerArr))) {
    return {
      filteredFile: fileArray,
      outlier2DListOfRowGroupedByReplicate: [[]],
    };
  }
  let arrOfOutliersToFilter = [];
  let outlier2DListOfRowGroupedByReplicate = [];

  outlierList.forEach((replicateNameArr) => {
    // for each replicate name array, we will make a similar array with full samples

    let fullSampleToMirrorReplicateArr = [];

    replicateNameArr.forEach((sampleReplicateName) => {
      // get list of every sample object with given replicate name
      const fullSampleByReplicate = [...fileArray].filter(
        (row) => row.Replicate === sampleReplicateName
      );

      if (fullSampleByReplicate.length !== 0) {
        arrOfOutliersToFilter = arrOfOutliersToFilter.concat(
          fullSampleByReplicate
        );

        // push that list into parent list
        fullSampleToMirrorReplicateArr.push(fullSampleByReplicate);
      }
    });

    if (fullSampleToMirrorReplicateArr.length !== 0) {
      outlier2DListOfRowGroupedByReplicate.push(fullSampleToMirrorReplicateArr);
      fullSampleToMirrorReplicateArr = [];
    }
  });

  const filteredFile = [...fileArray].filter(
    (row) => !arrOfOutliersToFilter.includes(row)
  );
  return { filteredFile, outlier2DListOfRowGroupedByReplicate };
};

export function quantMapper(fileDataJson, replicateNum, userOutlierSamples) {
  let tempSum = []; //for ratio group average
  let tempQuantSum = []; //for quantification group avg
  const replicateSet = replicateNum; //group size
  const tempOutlierList = []; // transform outliers if any

  const parsedFileDataJson = [...fileDataJson]
    .map((row) => {
      // Need object copy to extend props
      const rowCopy = parseFloatFromObjectCopy({ ...row });
      return rowCopy;
    })
    .sort((rowCopy, next) => {
      // sort by name to group samples together in run
      const first = rowCopy?.Replicate;
      const second = next?.Replicate;
      if (first < second) {
        return 1;
      }
      if (first > second) {
        return 1;
      }
      return 0;
    });

  const { filteredFile, outlier2DListOfRowGroupedByReplicate } =
    processOutliersFromFileData(parsedFileDataJson, userOutlierSamples);

  const fileDataJsonArray = filteredFile;
  // most hate for loops in favor of more semantic "map" function.
  // but I am not like most :)
  for (let index = 0; index < fileDataJsonArray.length; index++) {
    fileDataJsonArray[index].id = index; //need this for datatables
    tempSum.push(fileDataJsonArray[index]?.ParsedRatioToStandard);
    tempQuantSum.push(fileDataJsonArray[index]?.ParsedQuantification);

    if ((index + 1) % replicateSet === 0) {
      //if the next value is end of batch, lets do what we have so far

      //add replicates in that batch
      const initialVal = 0; //for ratio to standard
      const initialQuantVal = 0; //for quantification

      // sum array values for Ratio To Standard
      const sum = tempSum.reduce(
        (accumulator, currentVal) => accumulator + currentVal,
        initialVal
      );

      //sum array values for Quantification
      const quantSum = tempQuantSum.reduce(
        (acc, currVal) => acc + currVal,
        initialQuantVal
      );

      //find the average of replicates in the batch
      const replicateSetAverage = sum / replicateSet;
      const quantSetAvg = quantSum / replicateSet;

      // create fields with averages
      fileDataJsonArray[index].RatioAvg = replicateSetAverage;
      fileDataJsonArray[index].QuantAvg = quantSetAvg;

      //standard deviation for Ratio by passing in array of values
      fileDataJsonArray[index].RSTDEV = std(tempSum);

      //stdev for Quantification
      fileDataJsonArray[index].QSTDEV = std(tempQuantSum);

      //coefficient of variation
      fileDataJsonArray[index].QuantCove = std(tempQuantSum) / quantSetAvg;
      fileDataJsonArray[index].RatioCove = std(tempSum) / replicateSetAverage;

      //for line graph
      fileDataJsonArray[index].x = replicateSetAverage;
      fileDataJsonArray[index].y = quantSetAvg;

      //for averagesTable

      //refresh the temporary array that holds values for the sum
      tempSum = [];
      //refresh temporary array holding quantification values
      tempQuantSum = [];
    }
  }

  // function above returns 2D array so check inner array
  if (outlier2DListOfRowGroupedByReplicate[0].length !== 0) {
    //const outlierSamples = outlier2DListOfRowGroupedByReplicate.filter((arr) => !isEmpty(arr) || arr.length !==0);

    const outlierSamples = outlier2DListOfRowGroupedByReplicate;
    //if we have outliers
    //create a temp list
    for (let iterator = 0; iterator < outlierSamples.length; iterator++) {
      //iterate thru 2D arr

      if (outlierSamples[iterator].length < 2) {
        //if only one obj
        const singletonListObj = outlierSamples[iterator][0]; //set a variable for that object for readability
        const singletonObjMapped = singletonListObj.map((singleObj) => {
          singleObj.RatioAvg = singleObj.ParsedRatioToStandard;
          singleObj.QuantAvg = singleObj.ParsedQuantification;

          //for line charts
          singleObj.x = singleObj.ParsedRatioToStandard;
          singleObj.y = singleObj.ParsedQuantification;
          singleObj.QuantCove = 'single sample';
          singleObj.RatioCove = 'single sample';
          singleObj.RSTDEV = 'single sample';
          singleObj.QSTDEV = 'single sample';
          singleObj.id = uniqueId();

          return singleObj;
        });

        tempOutlierList.push(singletonObjMapped);
      } else {
        // if there is more than one item in group

        const listOfOutliers = outlierSamples[iterator].flat(); //set an obj list
        const ratioSum = listOfOutliers.reduce(
          (acc, curr) =>
            acc?.ParsedRatioToStandard + curr?.ParsedRatioToStandard
        );
        const quantSum = listOfOutliers.reduce(
          (acc, curr) => acc?.ParsedQuantification + curr?.ParsedQuantification
        );
        const outlierGrpAvg = ratioSum / listOfOutliers.length; //find the avg
        const quantGrpAvg = quantSum / listOfOutliers.length;
        listOfOutliers[listOfOutliers.length - 1].RatioAvg = outlierGrpAvg; //at the last item in arr, create an outlier prop equal to avg
        listOfOutliers[listOfOutliers.length - 1].QuantAvg = quantGrpAvg;
        listOfOutliers[listOfOutliers.length - 1].RSTDEV = std(ratioSum);
        listOfOutliers[listOfOutliers.length - 1].QSTDEV = std(quantSum);

        listOfOutliers[listOfOutliers.length - 1].RatioCove =
          std(ratioSum) / outlierGrpAvg;
        listOfOutliers[listOfOutliers.length - 1].QuantCove =
          std(quantSum) / quantGrpAvg; //at the last item in arr, create an outlier prop equal to avg
        // at the last item in arr, create an outlier prop equal to avg

        //for line charts
        listOfOutliers[listOfOutliers.length - 1].x = outlierGrpAvg; //at the last item in arr, create an outlier prop equal to avg
        listOfOutliers[listOfOutliers.length - 1].y = quantGrpAvg;
        tempOutlierList.push(listOfOutliers); // add this list to the list
      }
    }
  }

  // should only have to flat one level
  return fileDataJsonArray.concat(tempOutlierList.flat());
}
