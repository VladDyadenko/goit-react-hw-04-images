import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { FaSistrix } from 'react-icons/fa';

import { FormBox, FormBtn, FormElement, FormInput } from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const handlInputChange = e => {
    setSearchValue(e.currentTarget.value);
  };

  const dataSearch = e => {
    e.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Enter data to search!');
      return;
    }

    onSubmit(searchValue);
  };

  return (
    <FormBox>
      <FormElement onSubmit={dataSearch}>
        <FormBtn type="submit">
          <FaSistrix size={20}></FaSistrix>
        </FormBtn>

        <FormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handlInputChange}
          value={searchValue}
        />
      </FormElement>
    </FormBox>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
