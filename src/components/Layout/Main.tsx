import React, { FC, useState } from 'react'
import { PrimarySearchAppBar } from '../Navbar'
import { Drawer } from '../Drawer'
import Box from '@material-ui/core/Box'

export const MainLayout: FC = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <PrimarySearchAppBar onClick={() => setOpen(true)} />
      <Drawer open={open} setOpen={setOpen} />
      {children}
      <Box>
        
      </Box>
    </>
  )
}