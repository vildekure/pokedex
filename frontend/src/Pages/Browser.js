import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PokeCard } from "../Components/PokeCard";

export const Browser = () => {
  //Variabel som endrer seg hele tiden.
  const [allPokemon, setAllPokemon] = useState([]);

  //Når siden laster, så gjør vi dette
  useEffect(() => {
    fetch("api/all-pokemon")
      .then((res) => res.json())
      .then((data) => setAllPokemon(data));
  }, []);
  

  return (
    <Container sx={{
      paddingTop: "76px", 
      backgroundImage: "url('./pokeball.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right top",
      backgroundAttachment: "fixed"
      }}>
      {allPokemon.length === 0 && (
        <Stack height="100vh">
        <CircularProgress
          sx={{
            color: "purple",
            margin: "auto",
          }}
        />
        </Stack>
      )}

      {allPokemon.length > 0 && (
        <Box>
          <Typography sx={{ paddingBottom: "24px" }} variant="h3">
            Pokédex
          </Typography>

          <Stack direction="row" sx={{ flexWrap: "wrap" }}>
            {allPokemon.map((pokemon) => (
              <PokeCard pokemon={pokemon} />
            ))}
          </Stack>
        </Box>
      )}
    </Container>
  );
};
