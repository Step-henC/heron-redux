import { quantMapper } from './quant-mapper';

describe('Quant Mapper Tests', () => {
  // it('Should Map File Data', () => {
  //   // Assumed csv already parsed from csv
  //   // important Quantification has the fmol
  //   const input = [
  //     {
  //       Replicate: 'whatver_name_1',
  //       Peptide: 'AKKDJSK',
  //       'Peptide Peak Found Ratio': 0.2,
  //       'Peptide Retention Time': 1,
  //       Protein: 'GOOD protein',
  //       Quantification: '3 fmol',
  //       'Ratio To Standard': 2,
  //     },
  //     {
  //       Replicate: 'whatver_name_2',
  //       Peptide: 'AKKDJSK',
  //       'Peptide Peak Found Ratio': 0.3,
    //     'Peptide Retention Time': 1.2,
    //     Protein: 'GOOD protein',
    //     Quantification: '3.1 fmol',
    //     'Ratio To Standard': 2.1,
    //   },
    //   {
    //     Replicate: 'whatver_name_3',
    //     Peptide: 'AKKDJSK',
    //     'Peptide Peak Found Ratio': 0.1,
    //     'Peptide Retention Time': 1.3,
    //     Protein: 'GOOD protein',
    //     Quantification: '2.9 fmol',
    //     'Ratio To Standard': 2,
    //   },
    // ];

  //   const actual = quantMapper(input, 3, [[]]);

  //   expect(actual[2].QSTDEV).toBe(0.10000000000000009);
  //   expect(actual[2].RSTDEV).toBe(0.05773502691896263);

  //   expect(actual[2].RatioAvg).toBe(2.033333333333333);
  //   expect(actual[2].QuantAvg).toBe(3);
  //   expect(actual[2].QuantCove).toBe(0.03333333333333336);
  //   expect(actual[2].RatioCove).toBe(0.02839427553391605);
  //   expect(actual[2].x).toBe(2.033333333333333);
  //   expect(actual[2].y).toBe(3);

  //   // averages and dev should be on last object in replicate,
  //   // in this case, only on index 2
  //   expect(actual[1]?.QSTDEV).toBeUndefined();
  // });

  it('Should Map File Data with Outliers', () => {
    const loneSampleName = 'lone_sample_1';

    // Assumed csv already parsed from csv
    // important Quantification has the fmol
    const inputWithOneSetMissingSample = [
      {
        Replicate: 'whatver_name_1',
        Peptide: 'AKKDJSK',
        'Peptide Peak Found Ratio': 0.2,
        'Peptide Retention Time': 1,
        Protein: 'GOOD protein',
        Quantification: '3 fmol',
        'Ratio To Standard': 2,
      },
      {
        Replicate: 'whatver_name_2',
        Peptide: 'AKKDJSK',
        'Peptide Peak Found Ratio': 0.3,
        'Peptide Retention Time': 1.2,
        Protein: 'GOOD protein',
        Quantification: '3.1 fmol',
        'Ratio To Standard': 2.1,
      },
      {
        Replicate: 'whatver_name_3',
        Peptide: 'AKKDJSK',
        'Peptide Peak Found Ratio': 0.1,
        'Peptide Retention Time': 1.3,
        Protein: 'GOOD protein',
        Quantification: '2.9 fmol',
        'Ratio To Standard': 2,
      },
      {
        Replicate: loneSampleName,
        Peptide: 'AKKDJSK',
        'Peptide Peak Found Ratio': 0.1,
        'Peptide Retention Time': 1.3,
        Protein: 'GOOD protein',
        Quantification: '2.9 fmol',
        'Ratio To Standard': 2,
      },
      {
        Replicate: 'outlier_set_1',
        Peptide: 'AKKDJSK',
        'Peptide Peak Found Ratio': 0.1,
        'Peptide Retention Time': 1.3,
        Protein: 'GOOD protein',
        Quantification: '2.9 fmol',
        'Ratio To Standard': 2,
      },
      {
        Replicate: 'outlier_set_2',
        Peptide: 'AKKDJSK',
        'Peptide Peak Found Ratio': 0.3,
        'Peptide Retention Time': 1.6,
        Protein: 'GOOD protein',
        Quantification: '2.1 fmol',
        'Ratio To Standard': 1.5,
      },
    ];

    const actual = quantMapper(inputWithOneSetMissingSample, 3, [
      [loneSampleName],
      ['outlier_set_1', 'outlier_set_2'],
    ]);

    expect(actual[3]['Replicate']).toBe(loneSampleName);
    expect(actual[3].QSTDEV).toBe('single sample');
    expect(actual[3].RSTDEV).toBe('single sample');
    expect(actual[3].RatioCove).toBe('single sample');
    expect(actual[3].QuantCove).toBe('single sample');
    expect(actual[3].RatioAvg).toBe(2);
    expect(actual[3].QuantAvg).toBe(2.9);
    expect(actual[3].x).toBe(2);
    expect(actual[3].y).toBe(2.9);

    // should only be on final sample in list
    expect(actual[4]?.RSTDEV).toBeUndefined();

    expect(actual[5].Replicate).toBe('outlier_set_2');
    expect(actual[5].RatioAvg).toBe(1.75);
    expect(actual[5].QuantAvg).toBe(2.5);
    expect(actual[5].RSTDEV).toBe(0); //samples had same values
    expect(actual[5].QSTDEV).toBe(0);

    expect(actual[5].x).toBe(1.75);

    expect(actual[5].y).toBe(2.5);

    expect(actual[5].QuantCove).toBe(0);
    expect(actual[5].RatioCove).toBe(0);

    // averages and dev should be on last object in replicate,
    // in our outlier set of 2, it shoud only be on second sample (index 4 in the list)
  });

  it('Should handle provided outliers not present in file', () => {

    // in whatever_name_1 we added a fix to allow numbers
    const input = [
      {
        Replicate: 'whatver_name_1',
        Peptide: 'AKKDJSK',
        'Peptide Peak Found Ratio': 0.2,
        'Peptide Retention Time': 1,
        Protein: 'GOOD protein',
        Quantification: 3,
        'Ratio To Standard': 2,
      },
      {
        Replicate: 'whatver_name_2',
        Peptide: 'AKKDJSK',
        'Peptide Peak Found Ratio': 0.3,
        'Peptide Retention Time': 1.2,
        Protein: 'GOOD protein',
        Quantification: '3.1 fmol',
        'Ratio To Standard': 2.1,
      },
      {
        Replicate: 'lone_sample',
        Peptide: 'AKKDJSK',
        'Peptide Peak Found Ratio': 0.1,
        'Peptide Retention Time': 1.3,
        Protein: 'GOOD protein',
        Quantification: '2.9 fmol',
        'Ratio To Standard': 2,
      },
    ];

    // notice input is 2, we have 2 per group with one lone sample
    const actual = quantMapper(input, 2, [['lone_sample'],['pizza', 'spa']])

    //console.log(actual)
    expect(actual).toHaveLength(3)

    //these props should only be on last object in list, not the first object
    expect(actual[0]?.RSTDEV).toBeUndefined();

    // single sample should be recognized
    expect(actual[2].Replicate).toBe('lone_sample')
    expect(actual[2].QuantCove).toBe('single sample')



  })
});
