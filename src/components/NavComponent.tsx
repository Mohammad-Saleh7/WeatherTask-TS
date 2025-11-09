import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ButtonGroup,
  Button,
  TextField,
  IconButton,
  type Theme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModeToggle from "./Modetoggle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type NavComponentProps = {
  setCity: (city: string) => void;
};

const NavComponent: React.FC<NavComponentProps> = ({ setCity }) => {
  const { i18n, t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open: boolean = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorEl(event.currentTarget);
  const handleClose = (): void => setAnchorEl(null);

  const navigate = useNavigate();
  const handleExit = (): void => void navigate("/");

  const [input, setInput] = useState<string>("");

  const handleSearch = (): void => {
    if (!input.trim()) return;
    setCity(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box sx={{ flexGrow: 1, mb: { xs: 9, sm: 4 } }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={(theme: Theme) => ({
          py: { xs: 0.5, sm: 1 },
          bgcolor:
            theme.palette.mode === "dark"
              ? theme.palette.navbar.dNav
              : theme.palette.navbar.default,
          color: theme.palette.mode === "light" ? "black" : "white",
          boxShadow:
            theme.palette.mode === "light"
              ? "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px"
              : "rgba(119, 113, 113, 0.39) 0px 25px 20px -20px",
        })}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
          }}
        >
          <Box
            className="rtl-row"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <img
              src="/nav.png"
              alt="nav"
              style={{ height: 44, width: 44, borderRadius: "100%" }}
            />
            <Typography
              variant="body1"
              noWrap
              sx={(theme) => ({
                fontSize: { xs: "0.85rem", sm: "1rem" },

                color: theme.palette.mode === "dark" ? "white" : "#003464",
              })}
            >
              {t("app.title")}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginInlineStart: { xs: 0, sm: "auto" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <TextField
              label={t("header.search")}
              variant="outlined"
              size="small"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              fullWidth
              sx={{ maxWidth: { sm: 240, md: 300 } }}
              inputProps={{
                style: {
                  textAlign: i18n.language === "fa" ? "right" : "left",
                },
              }}
            />

            <IconButton
              id="settings-button"
              aria-controls={open ? "nav-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              color="inherit"
              size="medium"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>

          <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: i18n.language === "fa" ? "left" : "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: i18n.language === "fa" ? "left" : "right",
            }}
            PaperProps={{
              sx: (theme: Theme) => ({
                direction: i18n.language === "fa" ? "rtl" : "ltr",
                textAlign: "start",
                "& .MuiMenuItem-root": { textAlign: "start" },
                minWidth: 220,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.darkPaper
                    : theme.palette.background.lightPaper,
                color: theme.palette.text.primary,
              }),
            }}
          >
            <MenuItem
              onClick={handleClose}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                gap: 1,
                textAlign: "start",
              }}
            >
              {t("header.mode")}
              <Box sx={{ width: 160 }}>
                <ModeToggle />
              </Box>
            </MenuItem>

            <MenuItem
              onClick={handleClose}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                gap: 1,
              }}
            >
              {t("header.language")}

              <Box sx={{ width: 160 }}>
                <ButtonGroup
                  size="small"
                  variant="outlined"
                  fullWidth
                  sx={{
                    flexDirection:
                      i18n.language === "fa" ? "row-reverse" : "row",
                  }}
                >
                  <Button onClick={() => i18n.changeLanguage("en")}>
                    {t("header.english")}
                  </Button>
                  <Button onClick={() => i18n.changeLanguage("fa")}>
                    {t("header.persian")}
                  </Button>
                </ButtonGroup>
              </Box>
            </MenuItem>

            <MenuItem
              onClick={handleExit}
              sx={{
                display: "flex",
                gap: 1,
                "&:hover": { color: "#2481aa" },
                flexDirection: i18n.language === "fa" ? "row-reverse" : "row",
                alignItems: "center",
                textAlign: "start",
              }}
            >
              <LogoutIcon /> {t("header.exit")}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </Box>
  );
};

export default NavComponent;
