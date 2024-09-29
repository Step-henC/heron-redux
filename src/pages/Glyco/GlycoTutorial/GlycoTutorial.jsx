import './glycotutorial.css';

export default function GlycoTutorial() {
  const url = `${process.env.REACT_APP_PROTOCOL_LINK}`;
  return (
    <div className="g-tutor-main">
      <div className='g-tutor-title'>
        <h1>Glycosylation Tutorial</h1>
      </div>
      <div>
        <h2>Getting Started</h2>
        <section>
          <p>
            Heron Data expects
            the column headers of the CSV files to remain exactly the same as it
            was generated from Skyline. Heron Data can handle null and
            non-numerical values for analysis. <strong>Most importantly, the Replicate name of samples must end with an underscore (_) and a number. </strong>
            For example, "replcate_name_1" and "replicate_name_2". Failure to do so will prevent data analysis. If you need to go back and change the names to end 
            in an underscore and number, please do so. If not, the continue with the tutorial and analysis.
          </p>
        </section>
      </div>
      <div>
        <h2>Uploading the File</h2>
        <section>
          <p>
            Once the file is generated from Skyline, feel free to upload. Ensure the names end in an underscore. This upload process
            is less involved than Quantification.
          </p>
          </section>
          </div>
      <div>
        <h2>Analysis</h2>
        <section>
          <p>
            The raw data will be presented in a data table, that allows for sorting and an overview by you. This table ensures the data was uploaded
            and processed correctly with results you would expect. After, feel free to download the file into an excel file. 
            The excel file will have a sheet with each galNacgal subtype. The sheets will have averages of each replicate with the isoform and a pie chart generated from the results.
            This reduces time spent sorting this data into separate sheets, manually. 
          </p>
        </section>
      </div>
      <div>
        <h2>Wrapping Up</h2>
        <section>
          <p>
            That is a high level overview of Glycosylation analysis for Heron
            Data. For more, please visit our publication on 
            <a href={url}> protocols.io.</a>
          </p>
        </section>
      </div>
    </div>
  );
}
