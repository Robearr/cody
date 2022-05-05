import { AppBar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LocaleSelector } from '../../ui/navbar/LocaleSelector';

import logo from '../../images/logo.png';
import '../../styles/navbar.scss';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {

  const { t } = useTranslation();

  return (
    <AppBar position='static' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
      <Link to={'/'}>
        <img src={logo} alt='logo' style={{ width: '20%' }} />
      </Link>
      <Link to={`/tasks`} color='inherit'><Typography variant='h6'>{t('tasks')}</Typography></Link>
      <Link to={`/tasks/new`} color='inherit'><Typography variant='h6'>{t('newTask')}</Typography></Link>
      <LocaleSelector />
    </AppBar>
  );
};