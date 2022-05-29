import React from 'react'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// const MySelect = ({ options, defaultValue, value, onChange }) => {
//   return (
//     <select value={value} onChange={(event) => onChange(event.target.value)}>
//       <option value=''>{defaultValue}</option>
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.name}
//         </option>
//       ))}
//     </select>
//   )
// }

const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <Box sx={{ minWidth: '70%' }} style={{ marginBottom: 20 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{defaultValue}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value}
          label={defaultValue}
          onChange={(event) => onChange(event.target.value)}
        >
          <MenuItem value=''>All</MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default MySelect
