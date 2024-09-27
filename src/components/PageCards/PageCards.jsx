import './pagecards.css'
export default function PageCards({forwardedRef}){

const protocolsUrl = `${process.env.REACT_APP_PROTOCOL_LINK}`

  return (
    <div className='page-card-main' ref={forwardedRef}>
     <div className='card-info'>
      <h3>Quantification</h3>
      <p>This service parses a Sklyine CSV and performs calculations including averages, standard deviation and coefficient of variance. The results are visualized on screen with an option to download data in a csv and graphs in a PDF.</p>
      <div className='card-links'>   
        <a id='begin-q' href='/quant'>Begin Quantification</a>
        <a id='learn-q'href='/quant'>Learn Quantification Here</a>
      </div>
     </div>
     <div className='card-info'>
      <h3>Glycosylation</h3>
      <p>Upload your Skyline file for data transformation. Transformed data is exported into an Excel file. The Excel file contains data separated on multiple sheets with graphs for visualization. Certain criteria for naming data is required.</p>
      <div className='card-links'>   
        <a id='begin-q' href='/glyco'>Begin Glycosylation</a>
        <a id='learn-q'href='/glyco'>Learn Glycosylation Here</a>
      </div>
     </div>
     <div className='card-info'>
      <h3>Protocol Publication</h3>
      <p>Heron Data is for researchers, by researchers. Heron data is a Suite of tools for Mass Spectrometrists to simplify data analysis. See how Heron Data Suite fits into the context of Biomedical Research. Learn about our origins and the problems we are solving.</p>
      <div className='card-links'>   
        <a id='begin-q' href={protocolsUrl}>Learn more about us</a>
      </div>
     </div>

    </div>
  )
}