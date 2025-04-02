import React from 'react'

const footer = () => {
  return (
    <div style={{
      width: '100%',
    }}>
      <footer style={{
        fontSize: '1em'
      }}>
          &copy; {new Date().getFullYear()}
        </footer>
    </div>
  )
}

export default footer
