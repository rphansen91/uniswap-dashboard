import React, { useMemo } from "react";
import Avatar from "@material-ui/core/Avatar";

const { default: JazzIcon } = require("react-jazzicon");

export const AddressAvatar = ({
  address,
  ...props
}: {
  address: string;
  diameter?: number;
}) => {
  const seed = useMemo(
    () => parseInt((address || "").replace("0x", "").slice(0, 8), 16),
    [address]
  );
  return <JazzIcon seed={seed} {...props} />;
};

export const TokenAvatar = ({ address, size = 24 }: { address: string; size?: number }) => {
  if (!address) return null
  return (
    <Avatar
      style={{ height: size, width: size }}
      src={`${
        process.env.PUBLIC_URL
      }/assets/tokens/${address.toLowerCase()}.png`}
    >
      <AddressAvatar diameter={size - 7} address={address} />
    </Avatar>
  );
};

