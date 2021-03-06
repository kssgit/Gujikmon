import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import logo from '../img/구직몬.png';
import {LoginModal} from './LoginModal';
import {LogoutWithKakao , LogoutWithGoogle} from './SocialLogin';
import CSRFToken from '../api/csrftoken';
import { useStores } from '../store/Context';
import { observer } from 'mobx-react';
import AccountCircle from '@material-ui/icons/AccountCircle';

import {MapStore} from '../store/MapStore';

const { kakao } = window;



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.30),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.40),
    },
    marginRight: theme.spacing(2),
    marginLeft: 3,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    flex :1 ,
    justifyContent:'center',
    alignSelf:'center',
    align:'center',
},
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 50, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  App :{
      background : "#4D6AFF",
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  logo: {
    maxWidth: 100,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const PrimarySearchAppBar = observer(() => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchKeyworkd, setSearchKeword] = React.useState('');
  const isKakaoMenuOpen = Boolean(anchorEl);
  const isGoogleMenuOpen = Boolean(anchorE2);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const [loginOpen, setLoginOpen] = React.useState(false);
  const {userStore}= useStores();
  const {searchStore } =useStores();
  const {companyStore} = useStores();
  const {mapStore} =useStores();
  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleKakaoMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleGoogleMenuOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleKakaoMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleGoogleMenuClose = () => {
    setAnchorE2(null);
    handleMobileMenuClose();
  };

  const handleDeleteUser = async() => {
    const result = await userStore.deleteUser();
    console.log(result);
    if(result){
      alert("회원정보가 삭제되었습니다.");
      window.location.reload();
    }
    else{
      handleMobileMenuClose();
    }
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  function Login() {

    //const loginType =window.sessionStorage.getItem('login');
    const loginType =userStore.login_type;
    if(loginType === 0)//로그인 안된 상태
      return(<div>
        <CSRFToken></CSRFToken>
        <Button color="inherit" onClick={handleLoginOpen}>로그인</Button>
        <LoginModal open={loginOpen} setOpen={setLoginOpen} handleClose={handleLoginClose}></LoginModal>
        </div>
      )
    if(loginType === 1){//카카오 로그인된 상태
        return(
          <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleKakaoMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        )}
    else if(loginType ===2){ //구글 로그인된 상태
      return (
        <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleGoogleMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      )
    }
  }

  const handleValueChange = (e) =>{
    setSearchKeword( e.target.value);
  } 
  const handleSeacrhClick = (e)=>{
    alert(e);
  };
  async function keyPress(e){
    if(e.keyCode == 13){
      searchStore.searchFlag=false;
      const result = await searchStore.Search(searchKeyworkd);
      console.log(result);
      if (result.length > 0){
        companyStore.setCompany(result);
        
        //mapStore.mapCenter_y = result[0].company.y;
        //mapStore.mapCenter_x = result[0].company.x;

        let moveLatLon = new kakao.maps.LatLng(result[0].company.y, result[0].company.x  );
        console.log(result);
        mapStore.map.setCenter(moveLatLon);
      }
      e.target.value= '';
      setSearchKeword('');
    
    }
 }
  const menuId = 'primary-search-account-menu';
  const renderKakaoMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isKakaoMenuOpen}
      onClose={handleKakaoMenuClose}
    >      
      <MenuItem onClick={LogoutWithKakao}>로그아웃</MenuItem>
      <CSRFToken></CSRFToken>
      <MenuItem onClick={handleDeleteUser}>회원탈퇴</MenuItem>
    </Menu>
  );
  const renderGoogleMenu = (
    <Menu
      anchorEl={anchorE2}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isGoogleMenuOpen}
      onClose={handleGoogleMenuClose}
    >
      <LogoutWithGoogle></LogoutWithGoogle>
      <CSRFToken></CSRFToken>
      <MenuItem  onClick={handleDeleteUser}>회원탈퇴</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  


  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.App}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <RoomOutlinedIcon />
          </IconButton>
         <a href={void(0)} onClick="#"><img src={logo} alt="logo" className={classes.logo}/></a>

         <div className={classes.grow} />
          <div className={classes.search}  >
            <div className={classes.searchIcon} onClick={handleSeacrhClick}   >
              <SearchIcon />
            </div>
            <InputBase
              placeholder="기업명"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="searchKeyword"
              value={searchKeyworkd}
              onChange={handleValueChange}
              onKeyDown={keyPress}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
           {Login()}
                  
        </Toolbar>
      </AppBar>
      {/*renderMobileMenu*/}
      {renderKakaoMenu}
      {renderGoogleMenu}
    </div>
  );
});