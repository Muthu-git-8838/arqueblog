import { Avatar } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { FILE_SERVER } from "../constants/portConstants";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserAvatar({
  disableUserProfile = false,
  userId = "",
  text = null,
  alt = "N/A",
  src = null,
  visibility = true,
  ...restProps
}) {
  const loggedInUserId = useSelector((state) => state.user.profile._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!text && !src) {
    return null;
  }
  return src ? (
    <Avatar
      onClick={() => {
        if (!disableUserProfile && loggedInUserId !== userId) {
          navigate(`/profile/${userId}`);
          //   dispatch(
          //     setModal({
          //       open: true,
          //       type: "profile",
          //       props: {
          //         userId,
          //       },
          //     })
          //   );
        }
      }}
      alt={alt}
      className="mt-1"
      src={`${FILE_SERVER}/${src}`}
      {...restProps}
    />
  ) : (
    <Avatar
      sx={{
        background: "linear-gradient(#ab00fb 16%, #6256fa 100%) !important",
      }}
      aria-label="recipe"
      onClick={() => {
        if (!disableUserProfile && loggedInUserId !== userId) {
          navigate(`/profile/${userId}`);
          //   dispatch(
          //     setModal({
          //       open: true,
          //       type: "profile",
          //       props: {
          //         userId,
          //       },
          //     })
          //   );
        }
      }}
      {...restProps}
    >
      {text.length > 0 ? text[0].toUpperCase() : "N/A"}
    </Avatar>
  );
}

export default memo(UserAvatar);
