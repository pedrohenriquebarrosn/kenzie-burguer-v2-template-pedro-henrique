import { useContext } from 'react';
import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../providers/CartContext/CartContext';

const SearchForm = () => {
  const { searchTerm, setSearchTerm } = useContext(CartContext);

  return (
    <StyledSearchForm onSubmit={(event) => event.preventDefault()} role='search'>
      <input
        type='search'
        placeholder='Pesquisar produtos'
        aria-label='Pesquisar produtos'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green' aria-label='Pesquisar'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
