import React from 'react'

const Results = ({ results }) => {
  const toggleAllResults = (e) => {
    let resultBlock = document.getElementById("all-results")
    let toggledOff = resultBlock.style.display === 'none'
    if (toggledOff){
      resultBlock.style.display = 'block'
      e.target.innerHTML = "Collapse Results"
    } else {
      resultBlock.style.display = 'none'
      e.target.innerHTML = "Expand Results"
    }
  }
  return (
    <>
    <h1>Results</h1>
    <pre>Policy Decision: {results.policyDecision}</pre>
    <pre>Transaction ID: <a target="_blank" href={`https://preprod.admin.iddataweb.com/axnadmin/app/reports/verification-transaction/details/${results.jti}`}>{results.jti}</a></pre>
    <pre>...</pre>
    <button onClick={toggleAllResults}>Expand Results</button>
    <button onClick={() => window.location.href="http://localhost:3000"}>Restart</button>
    <button onClick={() => window.open(`https://preprod.admin.iddataweb.com/axnadmin/app/reports/verification-transaction/details/${results.jti}`, "_blank")}>View Full Transaction</button>
    <textarea readOnly id="all-results" style={{display: "none"}}>{JSON.stringify(results, undefined, 2)}</textarea>
    </>
  )
}

export default Results;