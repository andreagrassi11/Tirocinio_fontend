import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const CssTextField = styled(TextField)({
    input: {
        color: 'white !important',
        backgroundColor: '#3838388f'
    },
    color: 'white',
    '::placeholder': {
        color: 'white',
    },
    label: {
        color: 'white !important',
    },
    '& .MuiInput-underline': {
        borderBottomColor: 'transparent',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#dfc38c',
            borderRadius: '25px',
        },
        '&:hover fieldset': {
            borderColor: '#dfc38c',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#dfc38c',
            borderWidth: '2px',
        },
        '&.Mui-error fieldset': {
            borderColor: '#920609',
            borderWidth: 2,
            boxShadow: '0 0 7px red',
        },
    },
    '& .MuiInputBase-input': {
        borderRadius: '25px',
        height: '25px',
    },
});