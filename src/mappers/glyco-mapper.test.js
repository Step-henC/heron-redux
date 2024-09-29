import { parseFileDataInts } from './glyco-mapper';
describe('Glyc Mapper Tests', () => {
  it('Should transform total area to numbers', () => {
    // csv object after parsed from Papaparse
    const parsedCsvFromPapa = [
      {
        'Protein Name': 'good_protein',
        'Replicate Name': 'good_protein_1',
        'Peptide Sequence': 'DJKSJKDJSK',
        Precursor: 'Dskjdskjkds',
        'Total Area': '#/NaN',
        'Isotope Dist Rank': 0.2,
        'Isotope Dist Index': 0.1,
        'Isotope Dist Proportion': 0.2,
        'Best Retention Time': 22,
      },
      {
        'Protein Name': 'good_protein',
        'Replicate Name': 'good_protein_2',
        'Peptide Sequence': 'DJKSJKDJSK',
        Precursor: 'Dskjdskjkds',
        'Total Area': '#/NaN',
        'Isotope Dist Rank': 0.2,
        'Isotope Dist Index': 0.1,
        'Isotope Dist Proportion': 0.2,
        'Best Retention Time': 22,
      },
      {
        'Protein Name': 'good_protein',
        'Replicate Name': 'good_protein_3',
        'Peptide Sequence': 'DJKSJKDJSK',
        Precursor: 'Dskjdskjkds',
        'Total Area': 2,
        'Isotope Dist Rank': 0.2,
        'Isotope Dist Index': 0.1,
        'Isotope Dist Proportion': 0.2,
        'Best Retention Time': 22,
      },
    ];

    const actual = parseFileDataInts(parsedCsvFromPapa);

    expect(actual[0]['Total Area']).toBe('NaN');
    expect(actual[2]['Total Area']).toBe(2);
  });
});
