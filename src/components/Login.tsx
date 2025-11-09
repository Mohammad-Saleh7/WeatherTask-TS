import * as React from "react";
import {
  useTheme,
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  type Theme,
  Menu,
  MenuItem,
  ButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";
import type { MenuProps } from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ModeToggle from "./Modetoggle";
import i18n from "../i18n";

type FormValues = {
  userName: string;
};

type UserNameError = "required" | "minLength" | "maxLength";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[300]
        : "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
  "& .MuiMenu-list": {
    padding: "4px 0",
  },
  "& .MuiMenuItem-root": {
    "& .MuiSvgIcon-root": {
      fontSize: 18,
      color:
        theme.palette.mode === "dark"
          ? "inherit"
          : theme.palette.text.secondary,
      marginRight: theme.spacing(1.5),
    },
    "&:active": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      ),
    },
  },
}));

const Login: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { userName: "" } });

  const onSubmit = (data: FormValues) => {
    const name = data.userName.trim();
    if (name) {
      alert(t("toast.welcome", { name }));
      navigate("/dashboard");
      reset();
    } else {
      alert(t("toast.pleaseEnter"));
    }
  };

  const helperText: Record<UserNameError, string> = {
    required: t("errors.required"),
    minLength: t("errors.minLength"),
    maxLength: t("errors.maxLength"),
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Typography
          variant="h3"
          component="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            gap: 2,
            px: { xs: 2, sm: 3 },
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          {t("loading")}
          <CircularProgress size={28} />
        </Typography>
      ) : (
        <Container
          sx={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={(theme: Theme) => ({
              width: { xs: "100%", sm: "92%", md: 840, lg: 960 },
              height: { xs: "auto", md: 520, lg: 560 },
              color: theme.palette.mode === "dark" ? "white" : "black",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "white"
                  : "background.darkPaper",
              borderRadius: { xs: 2, md: "10px" },
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              overflow: "hidden",
              p: 0,
            })}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "60%", lg: "80%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: { xs: "auto", md: "100%" },
                py: { xs: 3, sm: 4 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: { xs: "auto", md: "100%" },
                    width: "100%",
                    py: { xs: 2, sm: 3 },
                  }}
                >
                  <Typography
                    component="h5"
                    variant="h5"
                    sx={{
                      mb: { xs: "12px", sm: "16px", md: "20px" },
                      fontWeight: "bold",
                      fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    {t("login.title")}
                  </Typography>

                  <TextField
                    sx={{
                      width: { xs: "90%", sm: "85%", md: "80%" },
                      paddingX: { xs: 1 },
                    }}
                    id="user-name"
                    label={t("login.label")}
                    variant="outlined"
                    error={!!errors.userName}
                    helperText={
                      errors.userName?.type
                        ? helperText[errors.userName.type as UserNameError]
                        : " "
                    }
                    {...register("userName", {
                      required: true,
                      maxLength: 31,
                      minLength: 2,
                    })}
                  />
                </Box>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: { xs: "90%", sm: "85%", md: "80%" },
                    bgcolor: "#2196f3",
                    color: "white",
                    paddingX: { xs: 2 },
                    py: { xs: 1, sm: 1.1 },
                  }}
                >
                  {t("login.submit")}
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "50%", lg: "60%" },
                display: { xs: "none", md: "block" },
                minWidth: 0,
                position: "relative",
                lineHeight: 0,
              }}
            >
              <img
                src={
                  theme.palette.mode === "light" ? "/Login.png" : "/loginD.png"
                }
                alt="weather"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              />
            </Box>
          </Box>
          <Button
            id="options-button"
            aria-controls={menuOpen ? "options-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleMenuClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={(theme: Theme) => ({
              bgcolor:
                theme.palette.mode === "light"
                  ? "background.default"
                  : "background.default",
              color: "gray",
              borderBottom: "1px solid gray",
              borderRadius: 0,
            })}
          >
            {t("header.language")}
          </Button>
          <StyledMenu
            id="options-menu"
            slotProps={{ list: { "aria-labelledby": "options-button" } }}
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            PaperProps={{
              sx: (theme: Theme) => ({
                direction: i18n.language === "fa" ? "rtl" : "ltr",
                textAlign: "start",
                "& .MuiMenuItem-root": {
                  textAlign: "start",
                  "& .MuiSvgIcon-root": {
                    color: theme.palette.primary.main,
                  },
                },
                minWidth: 220,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.darkPaper
                    : "white",
                color: theme.palette.text.primary,
              }),
            }}
          >
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                gap: 1,
              }}
            >
              {t("header.language")}

              <ButtonGroup
                size="small"
                variant="outlined"
                fullWidth
                sx={{
                  flexDirection: i18n.language === "fa" ? "row-reverse" : "row",
                }}
              >
                <Button onClick={() => i18n.changeLanguage("en")}>
                  {t("header.english")}
                </Button>
                <Button onClick={() => i18n.changeLanguage("fa")}>
                  {t("header.persian")}
                </Button>
              </ButtonGroup>
            </MenuItem>

            <MenuItem
              onClick={handleMenuClose}
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
              <ModeToggle />
            </MenuItem>
          </StyledMenu>
        </Container>
      )}
    </div>
  );
};

export default Login;
