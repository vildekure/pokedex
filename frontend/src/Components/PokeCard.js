import { Box, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../helpers/data";

export const PokeCard = ({ pokemon }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => {
        navigate("/pokemon/" + pokemon.name);
      }}
      sx={{ width: "50%" }}
    >
      <Box
        sx={{
          padding: "60px",
          backgroundColor: colors[pokemon.types[0]],
          marginRight: "12px",
          marginBottom: "12px",
          borderRadius: "16px",
        }}
      >
        <Typography
          sx={{
            textTransform: "capitalize",
            paddingBottom: "12px",
            color: "white",
          }}
          variant="h6"
        >
          {pokemon.name}
        </Typography>

        <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <Box
          sx={{ 
            display: "flex",
            flexDirection: "column"
          }}>
            <Chip
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                textTransform: "capitalize",
                fontSize: "15px",
                marginRight: "auto",
                marginBottom: "5px",
                paddingX: "5px"
              }}
              label={pokemon.types[0]}
            />
            {pokemon.types.length > 1 && (
              <Chip
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  textTransform: "capitalize",
                  marginRight: "auto",
                  fontSize: "15px",
                  paddingX: "5px"
                }}
                label={pokemon.types[1]}
              />
            )}
          </Box>
          <Box
            sx={{
              width: "150px",
            }}
            component="img"
            src={pokemon.image}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};
