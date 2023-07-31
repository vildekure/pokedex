import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../helpers/data";

//React komponent
export const Pokemon = () => {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState();
  const { name } = useParams();
  const [value, setValue] = useState("About");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetch(`/api/pokemon?pokemon=${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, []);

  return (
    <Stack height="100vh">
      {!pokemon && (
        <CircularProgress
          sx={{
            color: "purple",
            margin: "auto",
          }}
        />
      )}

      {pokemon && (
        <Stack
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: colors[pokemon.type[0]] || "white",
          }}
        >
          <Container
            sx={{
              maxWidth: "600px !important",
              padding: "70px",
              paddingBottom: "480px",
            }}
          >
            <Stack
              direction="row"
              width={"100%"}
              justifyContent="space-between"
              spacing={2}
            >
              <ArrowBackIcon
                onClick={() => navigate("/")}
                F
                sx={{ color: "white", fontSize: "35px" }}
              ></ArrowBackIcon>

              <Box onClick={() => setToggle((previous) => !previous)}>
                {!toggle && (
                  <FavoriteBorderIcon
                    sx={{ color: "white", fontSize: "35px", marginBottom: "3px" }}
                  />
                )}
                {toggle && (
                  <FavoriteIcon sx={{ color: "white", fontSize: "35px" }} />
                )}
              </Box>
            </Stack>

            <Stack
              direction="row"
              width={"100%"}
              justifyContent="space-between"
              spacing={2}
            >
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "7px",
                }}
                variant="h5"
              >
                {pokemon.name}
              </Typography>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "white",
                  textAlign: "center",
                }}
                variant="h5"
              >
                {`#${pokemon.id}`}
              </Typography>
            </Stack>
            <Chip
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                textTransform: "capitalize",
                fontSize: "15px",
              }}
              label={pokemon.type[0]}
            />
          </Container>
          <Box
            sx={{
              backgroundColor: "#F3F3F3",
              width: "100%",
              position: "relative",
              flex: 1,
            }}
          >
            <Box
              sx={{
                margin: "auto",
                position: "absolute",
                right: 0,
                left: 0,
                top: -450,
              }}
              component="img"
              src={pokemon.image}
            ></Box>
            <Box
              sx={{
                paddingTop: "50px",
                paddingLeft: "30%",
                margin: "auto",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="About" label="About" />
                <Tab value="Base stats" label="Base stats" />
                <Tab value="Forms" label="Forms" />
                <Tab value="Abilities" label="Abilities" />
              </Tabs>
              {value === "About" && (
                <Box>
                  <Stack
                      marginTop={"5px"}
                      >
                    <Typography>Height: {pokemon.height}</Typography>
                    <Typography>Weight: {pokemon.weight}</Typography>
                  </Stack>
                </Box>
              )}
              {value === "Base stats" && (
                <Box
                sx={{
                  textTransform: "capitalize",
                  marginTop: "5px",
                  justifyContent: "space-around",
                }}>
                  <Stack></Stack>
                  <Typography>{pokemon.stats[0].name}: {pokemon.stats[0].stat}</Typography>
                  <Typography>{pokemon.stats[1].name}: {pokemon.stats[1].stat}</Typography>
                  <Typography>{pokemon.stats[2].name}: {pokemon.stats[2].stat}</Typography>
                  <Typography>{pokemon.stats[3].name}: {pokemon.stats[3].stat}</Typography>
                  <Typography>{pokemon.stats[4].name}: {pokemon.stats[4].stat}</Typography>
                  <Typography>{pokemon.stats[5].name}: {pokemon.stats[5].stat}</Typography>
                </Box>
              )}
              {value === "Forms" && <Box>hei hei</Box>}
              {value === "Abilities" && <Box>hei hei</Box>}
            </Box>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};
