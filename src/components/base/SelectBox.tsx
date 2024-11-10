import { FormControl, InputLabel, Select } from "@mui/material";
import React from "react";

interface SelectBoxProps {
  setPersonName: React.Dispatch<React.SetStateAction<string[]>>;
}

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function SelectBox({ setPersonName }: SelectBoxProps) {
  const handleChangeMultiple = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (
    <div className="mt-3 -ml-2">
      <FormControl
        sx={{
          m: 1,
          width: '100%',
          '& .MuiInputLabel-root': {
            color: 'white', 
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#1DB954',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', 
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1DB954', 
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            color: '#1DB954', 
          },
        }}
      >
        <InputLabel shrink htmlFor="select-multiple-native">
          Select Options
        </InputLabel>
        <Select<string[]>
          multiple
          native
           // @ts-ignore Typings are not considering `native`
          onChange={handleChangeMultiple}
          label="Select options"
          inputProps={{
            id: "select-multiple-native",
          }}
        >
          {names.map((name) => (
            <option key={name} value={name} className="text-gray-300">
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectBox;
