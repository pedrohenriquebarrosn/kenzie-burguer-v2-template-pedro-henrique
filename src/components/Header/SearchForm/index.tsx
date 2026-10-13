import { useContext, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../providers/CartContext/CartContext';
import { useLanguage } from '../../../i18n';

const SearchForm = () => {
  const { searchTerm, setSearchTerm } = useContext(CartContext);
  const { t } = useLanguage();
  // Keep what the visitor is typing separate from the active catalog filter.
  const [draftTerm, setDraftTerm] = useState(searchTerm);

  return (
    <StyledSearchForm
      role='search'
      onSubmit={(event) => {
        event.preventDefault();
        setSearchTerm(draftTerm.trim());
      }}
    >
      <input
        type='search'
        placeholder={t('Pesquisar produtos')}
        aria-label={t('Pesquisar produtos')}
        value={draftTerm}
        onChange={(event) => setDraftTerm(event.target.value)}
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green' aria-label={t('Pesquisar')}>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
