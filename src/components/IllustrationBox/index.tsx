import { StyledIllustrationBox } from './style';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';
import BallsIllustration from '../../assets/BallsIllustrations.svg';
import Icon from '../../assets/Icon.svg';
import { StyledParagraph } from '../../styles/typography';
import { useLanguage } from '../../i18n';

const IllustrationBox = () => {
  const { t } = useLanguage();
  return (
  <StyledIllustrationBox>
    <img src={LogoKenzieBurguer} alt='Logo Kenzie Burguer' />
    <div className='styledBox'>
      <img src={Icon} alt={t('Ícone de cesta de compras')} />
      <StyledParagraph>
        {t('A vida é como um sanduíche, é preciso recheá-la com os ')}{' '}
        <strong>{t('melhores')}</strong>{t(' ingredientes.')}
      </StyledParagraph>
    </div>
    <img className='ballsImage' src={BallsIllustration} alt={t('Bolinhas')} />
  </StyledIllustrationBox>
  );
};

export default IllustrationBox;
