"use client";

import { useState } from "react";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { logout } from "@/app/api/user";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import { AuthFormType } from "../../types/users";

interface NavBarProps {
  currentUserLogin: string | null;
  onLogin: () => void;
  onLogOut: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  currentUserLogin,
  onLogin,
  onLogOut,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<AuthFormType>(AuthFormType.LOGIN);

  const openSignInModal = () => {
    setModalType(AuthFormType.LOGIN);
    setModalOpen(true);
  };

  const openSignUpModal = () => {
    setModalType(AuthFormType.SIGN_UP);
    setModalOpen(true);
  };

  const logOut = async () => {
    await logout();
    onLogOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          {currentUserLogin ? (
            <>
              <span>{currentUserLogin}</span>
              <Button color="inherit" onClick={logOut}>
                LogOut
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={openSignInModal}>
                Login
              </Button>
              <Button color="inherit" onClick={openSignUpModal}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <LoginForm
          onSubmit={() => {
            setModalOpen(false);
            onLogin();
          }}
          formType={modalType}
        />
      </Modal>
    </Box>
  );
};

export default NavBar;
