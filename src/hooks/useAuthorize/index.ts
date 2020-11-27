import { useState } from 'react';

interface Userinfo {
  uid: number;
  username: string;
  mobile: number;
}

const useAuthorize = () => {
  const [isAuthorize, setAuthorize] = useState(false);
  const [userinfo, setUserinfo] = useState<Userinfo | null>(null);
  return { isAuthorize, userinfo };
};

export default useAuthorize;
