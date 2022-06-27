//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import LoginButton from "../../components/LoginButton/LoginButton";
import Header from "../../components/Header/Header";
import Cards from "../../components/Card";
import Loader from "../../components/Loader/Loader";
import Detail from "../../components/Detail/Detail";
import UserPost from "../../components/UserCreate/UserPost";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { getUsers, getUsersByGender } from "../../redux/actions";

//======ESTILO E IMAGENES
import { Typography, Link, Box, Grid, Avatar, CardMedia } from "@mui/material";
import HenryGirl from "../../assets/HenryGirl.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TemporaryDrawer from "./../../components/SideBar/index";
import BottomBar from "../../components/BottomBar";
import Favorite from "@mui/icons-material/Favorite";

//PABLO CUANDO PUEDAS CONTAME DE ESTA FUNCION <`*.*´> (ZAYRA)
function Copyright(props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        right: 0,
        left: 0,
        boxShadow: 3,
        border: 0,
        marginTop: 60,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        <Link color="inherit" href="#">
          Henry Match
        </Link>{" "}
        {new Date().getFullYear()}
        {". "}
        Hecho con <Favorite fontSize="small" color="primary" /> por{" "}
        <Link color="inherit" href="#">
          alumnos
        </Link>{" "}
        de Henry
      </Typography>
    </Box>
  );
}

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const usersSelected = useSelector((state) => state.usersSelected);
  const { users, usersNick } = useSelector((state) => state);
  const [gender, setGender] = useState("both");

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(getUsersByGender(gender));
  }, [gender]);

  //RENDERIZADO CONDICIONAL DEL COMPONENTE MODAL CON LO MINIMO PARA CREAR UN USUARIO
  // function handleFilterByGenre(e){// revisar el estado en el inspector sale uno que no existe ??
  //   dispatch(getUsersByGender(gender))
  // }
  //ANTES DE CREAR EL USUARIO VERIFICO QUE NO LO TENGA YA EN LA BASE DE DATOS (EL UNICO ATRIBUTO QUE SE ME OCURRE ES nickname)

  // FUNCIONALIDAD PARA FILTRAR Y MANDAR AL COMPONENTE CARD LOS USUARIOS QUE COINCIDAN CON EL genderInt DEL USUARIO('hombres mujeres ambos')

  //REVISAR EL RENDERIZADO CONDICIONAL DEL COMPONENTE LOADER

  return (
    <>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {/* ##################### MARTINNN ########################## */}
      {/* esto es el render del componente del post verificar la condicion del ternario*/}
      {/* {console.log(users.map( e => e.nickname))} */}
      {isAuthenticated && users.map((e) => e.nickname.includes(user?.sub)) ? (
        // <UserPost setGender={setGender} gender={gender} />
        <div />
      ) : null}
      {/* ####################################################### */}

      {/* usersSelected.length > 0  */}
      {isAuthenticated ? (
        <Grid>
          <CssBaseline />
          <Header />
          <Cards usersSelected={usersSelected}></Cards>
          <Detail />
          <BottomBar />
        </Grid>
      ) : (
        <>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${HenryGirl})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "start",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <Typography variant="h4">
                    Matchea y chateá con Alumnos de Henry!
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      right: 0,
                      left: 0,
                      border: 0,
                      marginTop: 20,
                    }}
                  >
                    <LoginButton />
                  </Box>
                  <Copyright sx={{ mt: 30 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
