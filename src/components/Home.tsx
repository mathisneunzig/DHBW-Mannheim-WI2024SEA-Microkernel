import React from "react";
import { pluginManager } from "../app/pluginManager";
import { Box, Typography, Grid, Card, CardContent, Link, Alert, List, ListItem } from "@mui/material";

export const Home: React.FC = () => {
  const plugins = pluginManager.getPlugins();
  const invalids = pluginManager.getInvalidPlugins();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Willkommen zur Microkernel App
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {plugins.map((plugin) => (
          <Grid key={plugin.id} size={{ xs: 4, md: 2 }}>
            <Link href={plugin.route} underline="none" color="black">
              <Card variant="outlined" sx={{
                position:"relative", width:"100%", paddingTop:"100%",
                background:`linear-gradient(${plugin.spin}deg, ${plugin.color1}, ${plugin.color2})`
              }}>
                <CardContent sx={{
                  position:"absolute", inset:0, display:"flex", justifyContent:"center", alignItems:"center"
                }}>
                  <Typography variant="body1" align="center" gutterBottom>
                    {plugin.tile}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {invalids.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Alert severity="warning" sx={{ mb: 1 }}>
            Einige Plugins sind nicht sichtbar, weil sie fehlerhaft konfiguriert sind:
          </Alert>
          <List dense>
            {invalids.map(iv => (
              <ListItem key={iv.id} sx={{ display:"list-item", listStyle:"disc", ml: 3 }}>
                <Typography variant="body2">
                  <strong>{iv.id}</strong>: {iv.errors.join("; ")}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};
