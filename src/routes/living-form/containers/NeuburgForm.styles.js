import React from 'react'
import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  & > * {
    margin-right: 15px !important;
    margin-bottom: 15px !important;
  }
`
