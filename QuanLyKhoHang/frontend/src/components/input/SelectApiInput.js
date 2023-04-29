import React, { useState, useRef } from 'react';
import {
  TextField,
  Typography,
  Box,
  Stack,
  InputLabel,
  Autocomplete,
  IconButton,
} from '@mui/material';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { VscLoading } from 'react-icons/vsc';
import useSnackbarContext from '~/hooks/hookContext/useSnackbarContext';
import useApisContext from '~/hooks/hookContext/useApisContext';
import ButtonBase from '../button/ButtonBase';

const AutoCompleteStyled = styled(Autocomplete)`
  width: 100%;
  height: 42px;
  border-radius: 6px;
  background-color: #fff;
  & .MuiInputBase-root {
    height: 42px;
    padding: 0 !important;
    & input {
      font-size: 13px;
      padding: 0;
    }
    & input::placeholder {
      font-size: 13px;
      color: #000;
    }
  }
`;

function SelectApiInput({
  title,
  label,
  placeholder,
  required = false,
  selectedValue,
  onSelect = () => {},
  apiCode = 'dmvt',
  getOptionLabel,
  filterOptions = (option) => option,
  renderOption,
  searchFileds = ['ma_vt', 'ten_vt'],
  value,
  FormAdd,
  autocompleteProps,
  ...props
}) {
  const alertSnackbar = useSnackbarContext();
  const { asyncGetList } = useApisContext();
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);
  const [load, setLoad] = useState(1);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const timerRef = useRef();

  // handle get data
  const handleGetData = async (search, page, oldOptions = []) => {
    try {
      setLoading(true);
      const condition = { page, limit: 20, $or: [] };
      if (search) {
        searchFileds.forEach((searchFiled) =>
          condition.$or.push({
            [searchFiled]: {
              $regex: search.split(' ').join('.*'),
              $options: 'i',
            },
          })
        );
        condition.$or.push({ $text: { $search: search } });
      }
      const resp = await asyncGetList(apiCode, condition);
      if (resp) {
        setOptions(resp.data || []);
        setCount(resp.count);
      }
    } catch (error) {
      alertSnackbar('error', error?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };
  // handle list box scroll
  const handleListBoxScroll = (e) => {
    if (options.length === count || loading === true) {
      e.preventDefault();
      return;
    }
    const { scrollHeight, scrollTop } = e.target;
    const height = e.target.clientHeight;
    const subtract = scrollHeight - scrollTop - height;
    if (subtract <= 10) {
      setPage(page + 1);
    }
  };
  // open form add
  const openFormAdd = () => {
    setOpenForm(true);
  };

  React.useEffect(() => {
    if (search && page > 1) {
      handleGetData(search, page, options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  React.useEffect(() => {
    if (search) {
      handleGetData(search, 1, []);
    } else {
      setOptions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  React.useEffect(() => {
    timerRef.current = setTimeout(() => {
      setSearch(searchText.trim());
    }, 500);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [searchText]);

  return (
    <>
      {openForm && (
        <FormAdd
          open={openForm}
          handleClose={() => setOpenForm(false)}
          defaultValues={{ [searchFileds[0]]: search }}
        />
      )}
      <Stack
        spacing="5px"
        sx={{ width: '100%' }}
        alignItems="flex-start"
        {...props}
      >
        {label && (
          <InputLabel sx={{ fontSize: '13px', cursor: 'pointer' }}>
            {label}{' '}
            {required && (
              <Typography
                component="span"
                sx={{ color: 'error.main', fontSize: '12px' }}
              >
                *
              </Typography>
            )}
          </InputLabel>
        )}
        <AutoCompleteStyled
          key={load}
          isOptionEqualToValue={() => true}
          open={!!searchText}
          placeholder={placeholder}
          forcePopupIcon={false}
          options={options}
          value={value}
          onBlur={() => setSearchText('')}
          onChange={(e, newValue) => onSelect(newValue)}
          ListboxProps={{
            onScroll: handleListBoxScroll,
            sx: { '& .MuiAutocomplete-option': { fontSize: '12px' } },
          }}
          noOptionsText={
            <Stack spacing="10px" alignItems="center">
              <Typography
                sx={{
                  fontSize: '13px',
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}
              >
                Không tìm thấy kết quả
              </Typography>
              <ButtonBase onClick={openFormAdd}>Thêm '{search}'</ButtonBase>
            </Stack>
          }
          getOptionLabel={getOptionLabel}
          filterOptions={filterOptions}
          renderOption={renderOption}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              value={searchText}
              sx={{ '& .MuiInputBase-root': { paddingRight: '5px' } }}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: loading ? (
                  <Box
                    className="round-loading"
                    sx={{
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: '#ededed',
                      marginRight: '5px',
                      cursor: 'pointer',
                      color: '#999',
                    }}
                  >
                    <VscLoading fontSize="14px" />
                  </Box>
                ) : (
                  <>
                    {!!selectedValue ? (
                      <IconButton
                        onClick={() => {
                          onSelect(null);
                          setOptions([]);
                          setLoad(load + 1);
                        }}
                      >
                        <MdClose fontSize="14px" />
                      </IconButton>
                    ) : null}
                  </>
                ),
              }}
            />
          )}
          {...autocompleteProps}
        />
      </Stack>
    </>
  );
}

export default SelectApiInput;
