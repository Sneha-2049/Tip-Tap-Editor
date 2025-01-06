import React from 'react'

function SavedContent(props) {
  return (
    <div className='Editor-Content'>
      <h1 className='header'>Your Saved Content</h1>
      <div
        className="savedContent"
        dangerouslySetInnerHTML={{ __html: props.savedContent }}
      />
    </div>

  )
}

export default SavedContent