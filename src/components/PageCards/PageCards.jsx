import './pagecards.css'
export default function PageCards({forwardedRef}){



  return (
    <div className='page-card-main' ref={forwardedRef}>
     <div className='card-info'>
      <h3>Quantification</h3>
      <p>Calculate Average Ratios. Visualize your data in tables and graphs. Export the results to a pdf or csv. Some other smart stuff here</p>
      <div className='card-links'>   
        <a id='begin-q' href='/quant'>Begin Quantification</a>
        <a id='learn-q'href='/quant'>Learn Quantification Here</a>
      </div>
     </div>
     <div className='card-info'>
      <h3>Glycosylation</h3>
      <p>Calculate Average Ratios. Visualize your data in tables and graphs. Export the results to a pdf or csv. Some other smart stuff here</p>
      <div className='card-links'>   
        <a id='begin-q' href='/quant'>Begin Quantification</a>
        <a id='learn-q'href='/quant'>Learn Quantification Here</a>
      </div>
     </div>
     <div className='card-info'>
      <h3>Protocol Publication</h3>
      <p>Calculate Average Ratios. Visualize your data in tables and graphs. Export the results to a pdf or csv. Some other smart stuff here</p>
      <div className='card-links'>   
        <a id='begin-q' href='/quant'>Begin Quantification</a>
        <a id='learn-q'href='/quant'>Learn Quantification Here</a>
      </div>
     </div>

    </div>
  )
}