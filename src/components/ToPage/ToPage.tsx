import React from 'react'

type Props = {
    page: any,
    noPath?: boolean
}

const ToPage = ({page, noPath}: Props) => {
  return (
      <React.Fragment>
          {
              noPath ? window.open(`${window.location.origin}${page}`, "_self") : window.open(`${window.location.origin}${page}?path=${window.location.pathname}${window.location.search}`, "_self")
          }
      </React.Fragment>
  )
}

export default ToPage