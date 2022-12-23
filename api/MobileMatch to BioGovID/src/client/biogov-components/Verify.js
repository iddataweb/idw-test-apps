import React from "react";
const Verify = ({ submit, fetch, submitDocuments, documents }) => {
  //----------------------------------
  if (documents.status !== 'success') {
    var documents;
    var timeout = Date.now() + (15 * 60 * 1000) // timeout after 15 minutes.

    var session = setInterval(async () => {
      if (Date.now() > timeout) { // If the user has timed out, return.
        clearInterval(session)
        await submitDocuments({status: 'timed out'})
        return
      }

      documents = await fetch("/api/doccapture/getDocumentCaptureResults") // Request the user's uploaded documents.
        .then(res => res.json())
        .then(data => data)

      if (documents.status === 'success') { // If the user has successfully uploaded their documents,
        await submitDocuments(documents)
        clearInterval(session)
        return
      }
      console.log('waiting for documents ....')
    }, 3000) // Request a new status update every 3 seconds.
  }
  //----------------------------------
  switch(documents.status){
    case 'success': return (
      <>
        <p>Documents captured!</p><br></br>
        <p>Click submit to continue.</p><br></br>
        <button onClick={submit}>submit</button>
      </>
    )
    case 'timed out': return (
      <>
      <a href="http://localhost:3000">Session timed out. Click here to restart.</a>
      </>
    )
    case null: return (
      <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
        <h1>4. Verify</h1>
        <p style={{ textAlign: 'center' }}>waiting for documents</p>
        <img src="https://media.tenor.com/Z80xa5tlmn4AAAAC/ellipse-dots.gif" />
      </div>
    )
  }
};

export default Verify;