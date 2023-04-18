import React, { useRef } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../../components/svgs/Logo";
import LogoGoogle from "../../components/svgs/LogoGoogle";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import SwitchDarkmode from "../../components/switch/SwitchDarkmode";
import { useGlobalTheme } from "../../context/themeContext";
import InputForm from "../../components/input/InputForm";

import * as yup from "yup";
import moment from "moment";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosPublic from "../../utils/axiosPublic";
import { MdOutlineDateRange } from "react-icons/md";
import useSnackbarContext from "../../hooks/hookContext/useSnackbarContext";

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Your email is not valid"),
  password: yup.string().required("Please enter your password"),
  repeat_password: yup
    .string()
    .required("Please enter again your password")
    .equals([yup.ref("password")], "Repeat password is not match"),
  gender: yup
    .string()
    .required("Please choose your gender")
    .oneOf(["0", "1", "2"], "Gender is not valid"),
  terms: yup.boolean().oneOf([true], "You do not agree to our terms"),
});

function RegisterPage() {
  const [darkMode] = useGlobalTheme();
  const {
    message: [, setMessageSnackBar],
    type: [, setTypeSnackbar],
  } = useSnackbarContext();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { field: genderField } = useController({
    name: "gender",
    defaultValue: "0",
    control,
  });
  const birthDayRef = useRef();

  const navigate = useNavigate();

  const onSubmit = (values) => {
    return new Promise((resovle, reject) => {
      setTimeout(async () => {
        try {
          const resp = await axiosPublic.post("/auth/verify-email", {
            email: values.email,
          });
          if (resp && resp.status === 200) {
            resovle();
            navigate("/verify-email", { state: values });
          }
        } catch (error) {
          reject();
          setTypeSnackbar("error");
          setMessageSnackBar(error?.response?.data?.message || "Message error");
        }
      }, 500);
    });
  };

  // handleShowBirthdayPicker
  const handleShowBirthdayPicker = () => {
    birthDayRef.current.click();
  };
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: darkMode
          ? "darkmode.darkBG"
          : "whitish.liteBackground",
        paddingTop: "40px",
        overflow: "hidden",
      }}
    >
      <Container sx={{ position: "relative", zIndex: 2 }} maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Logo />
          <SwitchDarkmode />
        </Stack>
        <Box sx={{ padding: "50px 0 247px 0" }}>
          <Box
            sx={{
              width: "95%",
              maxWidth: "556px",
              backgroundColor: darkMode
                ? "darkmode.darkSecondary"
                : "whitish.pureWhite",
              margin: "0 auto",
              borderRadius: "10px",
              padding: "50px 60px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                color: darkMode ? "whitish.pureWhite" : "neutral.text1",
                textAlign: "center",
              }}
              className={`animate__animated animate__zoomInDown `}
            >
              Sign up
            </Typography>
            <Typography
              sx={{
                color: "neutral.text3",
                textAlign: "center",
                marginTop: "10px",
                fontWeight: 400,
              }}
            >
              Already have an account?{" "}
              <Link style={{ textDecoration: "none" }} to="/login">
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                  component="span"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <InputForm
                label="User name"
                isRequired
                type="text"
                id="username"
                placeholder="John Doe"
                register={register}
                name="username"
                errorMessage={errors?.username?.message}
              />
              <InputForm
                label="Email"
                isRequired
                type="text"
                id="email"
                placeholder="email@gmail.com"
                register={register}
                name="email"
                errorMessage={errors?.email?.message}
              />
              <InputForm
                label="Password"
                isRequired
                type="password"
                id="password"
                placeholder="Enter password"
                register={register}
                name="password"
                errorMessage={errors?.password?.message}
              />
              <InputForm
                label="Repeat Password"
                isRequired
                type="password"
                id="repeat"
                placeholder="Repeat password"
                register={register}
                name="repeat_password"
                errorMessage={errors?.repeat_password?.message}
              />
              <FormGroup>
                <FormLabel
                  htmlFor="birthday"
                  sx={{
                    width: "fit-content",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: darkMode ? "neutral.text3" : "neutral.text2",
                    marginBottom: "10px",
                  }}
                >
                  Birthday <sup>*</sup>
                </FormLabel>
                <TextField
                  id="birthday"
                  variant="outlined"
                  type="date"
                  className="textfield-darkmode"
                  inputRef={birthDayRef}
                  {...register("birthday")}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "whitish.strockColor",
                      },
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      "& fieldset": {
                        borderColor: darkMode ? "whitish.strockColor" : "",
                      },
                    },
                  }}
                  inputProps={{
                    max: moment().format("YYYY-MM-DD"),
                    open: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MdOutlineDateRange
                          onClick={handleShowBirthdayPicker}
                          style={{
                            cursor: "pointer",
                            color: darkMode ? "#fff" : "",
                            fontSize: "20px",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              <FormControl>
                <FormLabel
                  sx={{
                    width: "fit-content",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: darkMode ? "neutral.text3" : "neutral.text2",
                    marginBottom: "10px",
                  }}
                >
                  Gender <sup>*</sup>
                </FormLabel>
                <RadioGroup
                  {...genderField}
                  row
                  defaultValue="0"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="0"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: darkMode ? "neutral.text3" : "neutral.text2",
                      },
                    }}
                    control={
                      <Radio
                        sx={{ color: darkMode ? "neutral.text2" : "" }}
                        size="small"
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="1"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: darkMode ? "neutral.text3" : "neutral.text2",
                      },
                    }}
                    control={
                      <Radio
                        sx={{ color: darkMode ? "neutral.text2" : "" }}
                        size="small"
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    value="2"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: darkMode ? "neutral.text3" : "neutral.text2",
                      },
                    }}
                    control={
                      <Radio
                        sx={{ color: darkMode ? "neutral.text2" : "" }}
                        size="small"
                      />
                    }
                    label="Other"
                  />
                </RadioGroup>
                {errors?.gender && (
                  <FormHelperText sx={{ fontStyle: "italic" }} error>
                    {errors?.gender?.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Stack sx={{ marginBottom: 2 }}>
                <Stack
                  sx={{ padding: "10px 0" }}
                  direction="row"
                  gap="20px"
                  alignItems="flex-start"
                >
                  <Checkbox
                    {...register("terms")}
                    id="terms"
                    sx={{
                      padding: 0,
                      borderRadius: "50%",
                      "&.Mui-checked": {
                        "& .MuiSvgIcon-root": {
                          color: "primary.main",
                        },
                      },
                      "& .MuiSvgIcon-root": {
                        color: darkMode ? "neutral.text3" : "neutral.text4",
                      },
                    }}
                    size="small"
                  />
                  <FormLabel
                    htmlFor="terms"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: darkMode ? "neutral.text3" : "neutral.text2",
                    }}
                  >
                    I agree to the <Link to={"/terms"}>Tearms of Use</Link> and
                    have read and understand the{" "}
                    <Link to="/privacy">Privacy policy</Link>.
                  </FormLabel>
                </Stack>
                {errors?.terms && (
                  <FormHelperText sx={{ fontStyle: "italic" }} error>
                    {errors?.terms?.message}
                  </FormHelperText>
                )}
              </Stack>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                sx={{
                  textTransform: "none",
                  color: "whitish.pureWhite",
                  fontSize: "16px",
                  fontWeight: 600,
                  height: "52px",
                  "& .MuiLoadingButton-loadingIndicator": {
                    color: darkMode ? "neutral.text3" : "",
                  },
                }}
                variant="contained"
              >
                Create my account
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          position: "absolute",
          top: "46%",
          left: "75%",
          transform: "translate(-55%, 0)",
          zIndex: 1,
          width: "2800px",
          height: "2800px",
          backgroundColor: darkMode ? "darkmode.softDark" : "secondary.fif",
          borderRadius: "50%",
        }}
      ></Box>
    </Box>
  );
}

export default RegisterPage;
