import * as React from "react";
import { useColorScheme, ButtonGroup, Button } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import { useTranslation } from "react-i18next";

const ModeToggle: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { mode, setMode } = useColorScheme();

  if (mode === undefined) return null;

  return (
    <ButtonGroup
      size="small"
      variant="outlined"
      fullWidth
      sx={{
        flexDirection: i18n.language === "fa" ? "row-reverse" : "row",
      }}
    >
      <Button onClick={() => setMode("light")} sx={{ display: "flex", gap: 1 }}>
        <LightModeOutlinedIcon sx={{ fontSize: "18px" }} />
        {t("header.light")}
      </Button>

      <Button onClick={() => setMode("dark")} sx={{ display: "flex", gap: 1 }}>
        <BedtimeOutlinedIcon sx={{ fontSize: "18px" }} />
        {t("header.dark")}
      </Button>
    </ButtonGroup>
  );
};

export default ModeToggle;
