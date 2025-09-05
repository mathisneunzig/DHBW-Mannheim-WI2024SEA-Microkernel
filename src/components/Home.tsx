import React from "react";
import { pluginManager } from "../app/pluginManager";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Link
} from "@mui/material";

export const Home: React.FC = () => {
  const plugins = pluginManager.getPlugins();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Willkommen zur Microkernel App
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {plugins.map((plugin) => (
          <Grid key={plugin.tile} size={{ xs: 4, md: 2 }}>
            <Link href={plugin.route} underline="none" color="black">
              <Card
                variant="outlined"
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "100%",
                  background: `linear-gradient(${plugin.spin}deg, ${plugin.color1}, ${plugin.color2})` // 🎯 Hinzugefügt
                }}
              >
                <CardContent
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                    <Typography variant="body1" align="center" gutterBottom>
                      {plugin.tile}
                    </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
