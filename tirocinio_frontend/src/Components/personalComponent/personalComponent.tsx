import { Checkbox, TextField, styled } from "@mui/material";

export const CssTextField = styled(TextField)({
    color: 'white',
    '::placeholder': {
        color: 'white',
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

export const CssCheckbox = styled(Checkbox)({
    color: 'white',
    '::placeholder': {
        color: 'white',
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
