

/**
 * Converts Total Area string to int for the sake of the datatable.
 * @param file Skyline file with glyco data.
 * @returns Same file with Total Area as ints or NaN
 * NaN will be handled in backend
 */

export const parseFileDataInts = (file) => {

  return file.map((datum) => {
    const val = datum['Total Area']
    const numVal = parseInt(val)

    const returnVal = {...datum};
    returnVal['Total Area'] = isNaN(numVal) ? 'NaN' : numVal;

    return returnVal;
  })
}