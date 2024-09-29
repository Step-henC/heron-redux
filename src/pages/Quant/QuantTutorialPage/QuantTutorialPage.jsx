import './quantpagetutorial.css';

export default function QuantTutorialPage() {
  const url = `${process.env.REACT_APP_PROTOCOL_LINK}`;
  return (
    <div className="q-tutor-main">
      <div className='q-tutor-title'>
        <h1>Quantification Tutorial</h1>
      </div>
      <div>
        <h2>Getting Started</h2>
        <section>
          <p>
            It is important that CSV files generated from Skyline remain
            unaltered for an accurate, Heron Data analysis. Heron Data expects
            the column headers of the CSV files to remain exactly the same as it
            was generated from Skyline. Heron Data can handle null and
            non-numerical values for analysis. For accurate and repeatable
            results, it is important to leave the Skyline CSV file unaltered.
          </p>
        </section>
      </div>
      <div>
        <h2>Uploading the File</h2>
        <section>
          <p>
            Once the file is generated from Skyline, feel free to upload without
            any alterations. Then, provide the number of technical replicates in
            each group. Heron Data assumes replicates are placed together in the
            file. If there are samples that do not fit the common number of
            technical replicates, please click the switch and enter the
            Replicate names of those samples in the text field at the bottom.
            Make sure it is the Replicate name being entered.
          </p>
          </section>
          </div>
          <div>
          <h3>Entering Specific Replicates</h3>
          <section>
          <p>
            For example, if the CSV has 3 technical replicates, but one group
            has only two technical replicates, enter the replicate names in
            parenthesis followed by a comma. (replicate1, replicate2). If there
            is another group with only one technical replicate, that replicate
            name is entered in parenthesis by itself. A completed example would
            be
            (replicate1, replicate2)(lone_replicate)
          </p>
        </section>
      </div>
      <div>
        <h2>Analysis</h2>
        <section>
          <p>
            The results will visualized in two tables and a line graph. The
            first table shows the raw CSV data, with averages for Quantification
            And Ratio to Standard. The averages are calculated on the last
            technical replicate in a group and highlighted with a blue
            background. The next table is only the technical replicates with the
            averages, as well as Standard deviation and coefficient of variance.
            Sorting is available on this table. This data can be exported to a
            CSV. The final figure is a line chart for every sample for each
            unique Peptide found in the data. This data may be exported to a
            PDF. The PDF export will have cutoff or overflow if there are enough
            peptides. There is no current solution for this, but Heron Data will
            keep working for a solution.
          </p>
        </section>
      </div>
      <div>
        <h2>Wrapping Up</h2>
        <section>
          <p>
            That is a high level overview of Quantification analysis for Heron
            Data. For more, please visit our publication on 
            <a href={url}> protocols.io.</a>
          </p>
        </section>
      </div>
    </div>
  );
}
